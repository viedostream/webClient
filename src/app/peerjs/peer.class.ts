import * as PeerJS from './peerjs.js';

import { CONNECTION } from './connection.interface';

interface HashTable<T> {
    [key: string]: T;
}
export class Peer {
    localConnection: any;
    id: string;
    remotePeerList: HashTable<{ connection: any }>

    constructor() {
        // this.connection.resource = new PeerJS({
        //     host: "peer.koalament.io",
        //     secure: true,
        //     port: 443,
        //     path: '/peerjs',
        //     // debug: 3
        // });
        // this.connection.resource
        //     .on('open', id => {
        //         this.connection.id = id;
        //     }).on('connection', remoteConnection => {
        //         let remote: CONNECTION = {
        //             resource: remoteConnection,
        //             id: remoteConnection.peer
        //         }
        //         this.remoteConnectionList.push(remote)
        //     });


        
        //     conn
        //         .on('data', data => {
        //             // Will print 'hi!'
        //             switch (data.type || "") {
        //                 case "":
        //                     console.log(data);
        //                     break;
        //                 case "handshake":
        //                     this.remoteConnection = this.connection.connect(data.connectionId);
        //                     this.remoteConnection.on('open', _ => {
        //                         this.remoteConnection.send('hi back :)');
        //                     });
        //             }
        //         })

        // });
    }
}