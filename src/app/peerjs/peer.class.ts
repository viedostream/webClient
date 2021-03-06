import { HashTable } from './../assets/hashTable';
import * as PeerJS from './peerjs.js';

import { BehaviorSubject, Subject } from 'rxjs';

import { environment } from './../../environments/environment';

export class Peer {
    localConnection: any;
    id: Subject<string> = new Subject();
    remotePeerList: HashTable<{ connection: any, call: any }> = {}
    remoteMediaList: HashTable<any> = {};
    $remoteMediaList: BehaviorSubject<any> = new BehaviorSubject([]);

    constructor() {
        this.localConnection = new PeerJS(environment.PEERJS_CONFIG);
        this.localConnection
            .on('open', id => this.setLocalId(id))
            .on('connection', remoteConnection => this.resolveRequestForConnection(remoteConnection))
            .on('error', console.error)
            .on('call', call => this.callHandler(call));
    }

    setLocalId(id: string) {
        this.id.next(id);
    }

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
                console.log(data);
                // this.remoteConnection = this.connection.connect(data.connectionId);
                // this.remoteConnection.on('open', _ => {
                //     this.remoteConnection.send('hi back :)');
                // });
                break;
            case "":
            default:
                console.log('rjecting request of :', data);
                break;
        }
    }

    connectRemote(remoteAddress, stream) {
        return new Promise((resolve, reject) => {


            this.localConnection.call(remoteAddress, stream)
                .on('stream', console.log)
                .on('error', console.error);

            // let remoteConnection = this.localConnection.connect(remoteAddress);
            // remoteConnection
            //     .on('open', _ => {

            //         remoteConnection.send('hi!');

            //         console.log('sent hi');

            //         resolve();

            //     })




            // this.remotePeerList[remoteAddress].connection = remoteConnection;
        });
    }

    call(remoteAddress, stream) {
        return new Promise((resolve, reject) => {
            // if (!(remoteAddress in this.remotePeerList)) {
            //     return reject("remoteAddress not available")
            // }
            console.log(123123);

            this.localConnection.call(remoteAddress, stream);
            resolve();

            // this.remotePeerList[remoteAddress].call = this.localConnection.call(remoteAddress,);
        });
    }

    callHandler(call) {
        call.answer();
        call.on('stream', stream => {
            this.remoteMediaList[stream.id] = stream;
            this.$remoteMediaList.next(this.remoteMediaList);
        });
    }

    // addRemotePeer(remoteConnection) {
    //     remoteConnection

    // }
}