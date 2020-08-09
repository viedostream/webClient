import * as Peer from '../peerjs/peerjs.js';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {

  private peer: any = null;
  connectionId: string;;
  remoteConnection: any;

  constructor() {
    this.peer = new Peer();
    this.peer.on('open', id => {
      this.connectionId = id;
    }).on('connection', function (conn) {
      conn.on('data', function (data) {
        // Will print 'hi!'
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
    this.remoteConnection = this.peer.connect(targetAddress, {
      reliable: true
    });

    this.remoteConnection.on('open', _ => {
      // here you have conn.id
      this.remoteConnection.send('hi!');
      console.log('sending');
      
    });
  }

}
