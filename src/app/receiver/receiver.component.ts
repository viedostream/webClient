import * as Peer from '../peerjs/peerjs.js';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent implements OnInit {

  private peer: any = null;
  connectionId: string = '';

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
    // this.peer.
  }

}
