import * as BROWSER from "./navigator.js"

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  @ViewChild('player') player: any;

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
      // this.remoteConnection.send({
      //   type: "handshake",
      //   connectionId: this.connectionId
      // });
      console.log('sent');
      console.log('calling');
      let navigator = BROWSER.navigator;
      var getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
      getUserMedia({ video: { width: 1280, height: 720 }, audio: true }, (stream) => {
        // if ('srcObject' in this.player) {
        this.player.nativeElement.srcObject = stream;
        this.player.nativeElement.onloadedmetadata = () => {
          console.log('going to play');

          this.player.nativeElement.play();
          this.player.nativeElement.volume = 0;
        }
        // } else {
        //   console.log(BROWSER.window);

        //   this.player.src = BROWSER.window.URL.createObjectURL(stream);
        // }
        var call = this.connection.call(targetAddress, stream);
        // call.on('stream', function (remoteStream) {
        //   // Show stream in some video/canvas element.
        //   if ('srcObject' in this.player) {
        //     this.player.srcObject = stream;
        //   } else {
        //     // deprecated
        //     this.player.src = window.URL.createObjectURL(stream);
        //   }

        //   let media = new MediaStream(remoteStream);
        //   this.player.srcObject = media;
        //   console.log(remoteStream);
        // });
      }, function (err) {
        console.log('Failed to get local stream', err);
      });
    });
  }

}
