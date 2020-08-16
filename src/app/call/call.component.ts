import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AccessStateService } from './../accessState.service';
import { PeerService } from './../peerjs/peer.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  @ViewChild('remoteMedia') remoteMedia: ElementRef;
  // @ViewChild('remoteVideoList') remoteVideoList: ElementRef;
  // stream: any;
  // streamList: MediaStream[];

  constructor(
    public AccessStateS: AccessStateService,
    public PeerS: PeerService,
  ) {

  }

  ngOnInit(): void {
    // this.PeerS.$remoteMediaList.subscribe(streamList => {
    //   this.streamList = [];
    //   for(let key in streamList) {
    //     this.streamList.push(streamList[key]);
    //     console.log(streamList[key]); 
    //     typeof(streamList[key])
    //   }
    // })

  }

  ngAfterViewInit() {
    this.loadRemoteMedia();
    // this.loadLocalMedia()
  }

  loadLocalMedia() {
    this.AccessStateS.getMedia().then(stream => {
      this.remoteMedia.nativeElement.srcObject = stream;
      this.remoteMedia.nativeElement.onloadedmetadata = () => {
        this.remoteMedia.nativeElement.play();
        this.remoteMedia.nativeElement.volume = 0;
      }
    });
  }

  loadRemoteMedia() {
    this.remoteMedia.nativeElement.srcObject = this.PeerS.remoteMediaStream;
    this.remoteMedia.nativeElement.onloadedmetadata = () => {
      this.remoteMedia.nativeElement.play();
      this.remoteMedia.nativeElement.volume = 0;
    }
  }

  formSubmitEvent(event) {
    // let targetId = event.target[0].value;
    // console.log(this.stream);

    // this.PeerS.connectRemote(targetId, this.stream).then(_ => {
    //   // this.peer.call(targetId, this.stream).then(_ => {
    //   //   // this.peer.c
    //   // });
    // });
    // event.preventDefault();
  }

  foo() {
    console.log(111);

  }

}
