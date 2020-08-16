import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AccessStateService } from './../accessState.service';
import { Peer } from './../peerjs/peer.class';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  @ViewChild('localMedia') localMedia: ElementRef;
  @ViewChild('remoteVideoList') remoteVideoList: ElementRef;
  peer: Peer = new Peer();
  stream: any;
  streamList: MediaStream[];

  constructor(
    public AccessStateS: AccessStateService,
  ) {

  }

  ngOnInit(): void {
    this.peer.$remoteMediaList.subscribe(streamList => {
      this.streamList = [];
      for(let key in streamList) {
        this.streamList.push(streamList[key]);
        console.log(streamList[key]); 
        typeof(streamList[key])
      }
    })
  }

  ngAfterViewInit() {
    this.loadLocalMedia()
  }

  loadLocalMedia() {
    this.AccessStateS.mediaStream.subscribe(stream => {
      this.localMedia.nativeElement.srcObject = stream;
      this.stream = stream;
      this.localMedia.nativeElement.onloadedmetadata = () => {
        console.log('going to play');

        this.localMedia.nativeElement.play();
        this.localMedia.nativeElement.volume = 0;
      }
    });
  }

  formSubmitEvent(event) {
    let targetId = event.target[0].value;
    console.log(this.stream);
    
    this.peer.connectRemote(targetId, this.stream).then(_ => {
      // this.peer.call(targetId, this.stream).then(_ => {
      //   // this.peer.c
      // });
    });
    event.preventDefault();
  }

  foo() {
    console.log(111);
    
  }

}