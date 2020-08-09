import * as PeerJS from './peerjs.js';

export class Peer {

    connection: any;
    connectionId: string;;
    remoteConnection: any;

    constructor() {
        this.connection = new PeerJS({
            host: "49.12.13.207",
            port: 9000,
            path: '/peerjs',
        });
        this.connection.on('open', id => {
            this.connectionId = id;
        });
    }

}