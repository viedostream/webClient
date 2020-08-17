import * as PeerJS from './peerjs.js';

import { BehaviorSubject, Subject } from 'rxjs';
import { Component, Injectable } from '@angular/core';

import { AccessStateService } from './../accessState.service';
import { HashTable } from './../assets/hashTable';
import { Router } from '@angular/router';
import { ZixoService } from './../zixo/zixo.service';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PeerService {
    localConnection: any;
    $id: BehaviorSubject<string> = new BehaviorSubject("0");
    remotePeerList: HashTable<{ connection: any, call: any }> = {}
    remoteMediaStream: MediaStream;
    // remoteMediaList: HashTable<any> = {};
    // $remoteMediaList: BehaviorSubject<any> = new BehaviorSubject([]);
    private channelList: HashTable<{
        channelId: string,
        paymentIntervalActive: boolean,
        paymentInterval: any,
        connection: any
    }> = {};
    private invoiceList: HashTable<string[]> = {};
    private confirmedInvoiceList: HashTable<string[]> = {};

    constructor(
        private AccessStateS: AccessStateService,
        private Router: Router,
        private zixoS: ZixoService
    ) {
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.localConnection = new PeerJS(environment.PEERJS_CONFIG);
            this.localConnection
                .on('connection', remoteConnection => {
                    console.log('someone is trying to connect', remoteConnection);

                    this.resolveRequestForConnection(remoteConnection)
                })
                .on('error', console.error)
                .on('call', call => this.callHandler(call))
                .on('open', id => {
                    console.log(id);

                    return resolve(id);
                });
        })
    }

    // setLocalId(id: string) {
    //     console.log(id);

    //     this.$id.next(id);
    // }

    resolveRequestForConnection(remoteConnection) {
        console.log('trying to make connection happen');

        remoteConnection
            .on('data', data => {
                console.log(data);

                this.actionHandler(data, remoteConnection)
            })
            .on('open', console.log)
            .on('error', console.error)
            .on('close', console.error);
    }

    actionHandler(data, remoteConnection) {
        switch (data.type || "") {
            case "handshake":
                // this.remoteConnection = this.connection.connect(data.connectionId);
                // this.remoteConnection.on('open', _ => {
                //     this.remoteConnection.send('hi back :)');
                // });
                break;
            case "requestForCall":
                console.log(data.value);
                this.zixoS.channel_join(data.value.channelId).then(result => {
                    console.log(result);
                    this.AccessStateS.getMedia().then(stream => {
                        let mediaConnection = this.localConnection.call(remoteConnection.peer, stream);
                        let interval = setInterval(() => {
                            this.confirmPaymentOrClose(data.value.channelId, mediaConnection)
                                .then(state => {
                                    if (state) {
                                        clearInterval(interval)
                                    }
                                });
                        }, environment.STREAM_CONFIG.DURATION_SECONDS * 1.5 * 1000);

                        // mediaConnection.peerConnection.onconnectionstatechange = _ => {
                        //     if (call.peerConnection.connectionState == "disconnected") {
                        //         this.Router.navigate(['panel']);
                        //         this.stopPayment(call.peer);
                        //     }
                        // };

                    });
                })
                break;
            case "invoice":
                this.addInvoice(data.value.channelId, data.value.paymentId);
                break;
            case "":
            default:
                console.log('rejecting request of :', data);
                break;
        }
    }

    confirmPaymentOrClose(channelId, mediaConnection) {
        return new Promise(resolve => {
            let paymentId = this.invoiceList[channelId].pop();
            if (paymentId) {
                this.zixoS.channel_getPayment(channelId, paymentId).then(response => {
                    return resolve(false);
                })
            } else {
                mediaConnection.close();
                this.zixoS.Channel_close(channelId).then(_ => {
                });
                return resolve(true);
            }
        })
    }

    addInvoice(channelId, paymentId) {
        if (!this.invoiceList[channelId]) {
            this.invoiceList[channelId] = []
        }
        this.invoiceList[channelId].push(paymentId);
    }

    connectRemote(remoteAddress) {
        return new Promise((resolve, reject) => {
            let remoteConnection = this.localConnection.connect(remoteAddress);
            remoteConnection
                .on('open', _ => {
                    return resolve(remoteConnection);
                })
                .on('open', console.log)
                .on('error', console.error)
                .on('close', console.error);
        });
    }

    call(remoteAddress, stream) {
        return new Promise((resolve, reject) => {
            let mediaConnection = this.localConnection.call(remoteAddress, stream);
            resolve(mediaConnection);
        });
    }

    callHandler(call) {
        console.log('call coming through');
        call.answer();
        call.on('close', _ => {
            this.Router.navigate(['panel'])
        });
        call.on('error', _ => {
            this.Router.navigate(['panel'])
        });
        call.on('stream', stream => {
            this.remoteMediaStream = stream;
            this.Router.navigate(['panel/call']);
            this.makePayment(call.peer);
            // this.remoteMediaList[stream.id] = stream;
            // this.$remoteMediaList.next(this.remoteMediaList);
        });
        call.peerConnection.onconnectionstatechange = _ => {
            if (call.peerConnection.connectionState == "disconnected") {
                this.Router.navigate(['panel']);
                this.stopPayment(call.peer);
            }
        };
    }

    makePayment(peerId) {
        let channelObject = this.channelList[peerId];
        if (channelObject.paymentIntervalActive) {
            return true;
        }
        channelObject.paymentIntervalActive = true;
        channelObject.paymentInterval = setInterval(() => {
            this.zixoS.channel_invoice_create(
                channelObject.channelId,
                environment.STREAM_CONFIG.INVOICE_PRICE,
                'I am streaming from VIEDO :D ;)'
            ).then(res => {
                channelObject.connection.send({
                    type: 'invoice',
                    value: {
                        paymentId: res.paymentId,
                        channelId: res.channelId
                    }
                })
            })
        }, environment.STREAM_CONFIG.DURATION_SECONDS * 1000);
    }

    stopPayment(peerId) {
        clearInterval(this.channelList[peerId].paymentInterval);
        // close channel :)))
    }

    requestForCall(remotePeerId) {
        this.zixoS.channel_create(
            environment.STREAM_CONFIG.CHANNEL_PRICE,
            environment.STREAM_CONFIG.CHANNEL_LOCK_SECONDS
        ).then(channelData => {
            this.connectRemote(remotePeerId).then((connection: any) => {
                this.channelList[remotePeerId] = {
                    channelId: channelData.channelId,
                    paymentIntervalActive: false,
                    paymentInterval: null,
                    connection: connection
                };
                connection.send({
                    type: 'requestForCall',
                    value: {
                        channelId: channelData.channelId
                    }
                })
            });
        });
    }
}