import * as PeerJS from './peerjs.js';

import { BehaviorSubject, Subject } from 'rxjs';

import { HashTable } from './../assets/hashTable';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PeerService {
    localConnection: any;
    $id: BehaviorSubject<string> = new BehaviorSubject("0");
    remotePeerList: HashTable<{ connection: any, call: any }> = {}
    remoteMediaList: HashTable<any> = {};
    $remoteMediaList: BehaviorSubject<any> = new BehaviorSubject([]);

    constructor() {
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.localConnection = new PeerJS(environment.PEERJS_CONFIG);
            this.localConnection
                .on('connection', remoteConnection => this.resolveRequestForConnection(remoteConnection))
                .on('error', console.error)
                .on('call', call => this.callHandler(call))
                .on('open', id => {
                    return resolve(id);
                });
        })
    }

    // setLocalId(id: string) {
    //     console.log(id);

    //     this.$id.next(id);
    // }

    resolveRequestForConnection(remoteConnection) {
        remoteConnection
            .on('data', data => this.actionHandler(data));
    }

    actionHandler(data) {
        switch (data.type || "") {
            case "handshake":
                // this.remoteConnection = this.connection.connect(data.connectionId);
                // this.remoteConnection.on('open', _ => {
                //     this.remoteConnection.send('hi back :)');
                // });
                break;
            case "requestForCall":
                console.log("request call : ", data);
                // this.remoteConnection = this.connection.connect(data.connectionId);
                // this.remoteConnection.on('open', _ => {
                //     this.remoteConnection.send('hi back :)');
                // });
                break;
            case "":
            default:
                console.log('rejecting request of :', data);
                break;
        }
    }

    connectRemote(remoteAddress, stream) {
        return new Promise((resolve, reject) => {
            let remoteConnection = this.localConnection.connect(remoteAddress);
            remoteConnection
                .on('open', _ => {
                    return resolve(remoteConnection);
                })
        });
    }

    call(remoteAddress, stream) {
        return new Promise((resolve, reject) => {
            let mediaConnection = this.localConnection.call(remoteAddress, stream);
            resolve(mediaConnection);
        });
    }

    callHandler(call) {
        call.answer();
        call.on('stream', stream => {
            this.remoteMediaList[stream.id] = stream;
            this.$remoteMediaList.next(this.remoteMediaList);
        });
    }
}