import { Component, OnInit } from '@angular/core';

import { Peer } from './../peerjs/peer.class';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent extends Peer implements OnInit {

  private peer: any = null;
  connectionId: string;;
  remoteConnection: any;

  constructor() {
    super();
    this.connection.on('connection', function (conn) {
      conn.on('data', function (data) {
        console.log(data);
      });
    });
  }

  ngOnInit(): void {
  }

  formSubmitEvent(event) {
    let connecitonTarget = event.target[0].value;
    this.createRemoteConnection(connecitonTarget);
    event.preventDefault();
  }

  createRemoteConnection(targetAddress) {
    this.remoteConnection = this.connection.connect(targetAddress, {
      reliable: true
    });

    this.remoteConnection.on('open', _ => {
      // here you have conn.id
      this.remoteConnection.send('hi!');
      this.remoteConnection.send({
        type: "handshake",
        connectionId: this.connectionId
      });
      console.log('sending');
      
    });
  }

}
