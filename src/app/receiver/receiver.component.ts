import { Component, OnInit, ViewChild } from '@angular/core';

import { Peer } from './../peerjs/peer.class';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent extends Peer implements OnInit {

  @ViewChild('player') player: any;


  constructor() {
    super();
    this.connection.on('connection', conn => {
      // console.log(this.connection.connections);
      // console.log(conn, conn.open);


      conn
        .on('data', data => {
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
        })

    });
    this.connection.on('call', (media) => {
      media.answer();
      media.on('stream', stream => {
        this.player.nativeElement.srcObject = stream;
        this.player.nativeElement.play();
      })

    })
  }

  ngOnInit(): void {
    // this.peer.
  }

}
