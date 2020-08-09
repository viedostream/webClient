import { Component, OnInit } from '@angular/core';

import { Peer } from './../peerjs/peer.class';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent extends Peer implements OnInit {


  constructor() {
    super();
    this.connection.on('connection', conn => {
      conn.on('data', data => {
        // Will print 'hi!'
        switch (data.type || "") {
          case "":
            console.log(data);
            break;
          case "handshake":
            this.remoteConnection = this.connection.connect(data.connectionId);
            this.remoteConnection.on('open', _ => {
              this.remoteConnection.send('hi back :)');
            });
        }
      });
    });
  }

  ngOnInit(): void {
    // this.peer.
  }

}
