import * as PeerJS from './peerjs.js';

export class Peer {

    connection: any;
    connectionId: string;;
    remoteConnection: any;

    constructor() {
        this.connection = new PeerJS({
            host: "peer.koalament.io",
            secure: true,
            port: 443,
            path: '/peerjs',
            // debug: 3
        });
        this.connection.on('open', id => {
            this.connectionId = id;
        });
    }
}