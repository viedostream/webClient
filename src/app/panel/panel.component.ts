import { Component, OnInit } from '@angular/core';

import { AccessStateService } from './../accessState.service';
import { PanelService } from './panel.service';
import { PeerService } from './../peerjs/peer.service';
import { UserService } from './../user/user.service';
import { ZixoUserService } from './../zixo/user.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  userList: {
    username: string,
    geoLabel: string,
    peerId: string
  }[] = [];

  constructor(
    public zixoUserS: ZixoUserService,
    public userS: UserService,
    public PanelS: PanelService,
    public accessStateS: AccessStateService,
    public peerS: PeerService
  ) {
  }

  ngOnInit(): void {
    this.subscribeUserList();
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
              geoLabel: element.location.lat + " X " + element.location.lng,
              peerId: element.peerId
            });
          })
        }
      })
  }

  call(peerId) {
    this.peerS.requestForCall(peerId);
  }

}
