import { Component, OnInit } from '@angular/core';

import { AccessStateService } from './../accessState.service';
import { PanelService } from './panel.service';
import { PeerService } from './../peerjs/peer.service';
import { Router } from '@angular/router';
import { UserService } from './../user/user.service';
import { ZixoService } from './../zixo/zixo.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  userList: {
    username: string,
    title: string,
    geoLabel: string,
    peerId: string,
    position: {
      lat: number,
      lng: number
    }
  }[] = [];

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  constructor(
    public zixoS: ZixoService,
    public userS: UserService,
    public PanelS: PanelService,
    public accessStateS: AccessStateService,
    public peerS: PeerService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.subscribeUserList();
    if(!this.userS.authenticate()) {
      this.router.navigate(['user'])
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }


  subscribeUserList() {
    this.PanelS
      .aroundList
      .subscribe((data: {
        id: string,
        peerId: string,
        location: {
          lat: number,
          lng: number
        },
        userName: string
      }[]) => {
        this.userList = [];
        if (data) {
          data.forEach(element => {
            this.userList.push({
              username: element.userName,
              title: element.userName,
              geoLabel: element.location.lat + " X " + element.location.lng,
              peerId: element.peerId,
              position: {
                lat: element.location.lat,
                lng: element.location.lng,
              }
            });
          })
        }
      })
  }

  call(peerId) {
    this.peerS.requestForCall(peerId);
  }

  logggg(data) {
    console.log(data);
  }

}
