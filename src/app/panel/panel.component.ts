import { Component, OnInit } from '@angular/core';

import { AccessStateService } from './../accessState.service';
import { PanelService } from './panel.service';
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
    public accessStateS: AccessStateService
  ) {
  }

  ngOnInit(): void {
    this.updateList();
    // let zixoToken = this.zixoUserS.authenticate();
    // if (zixoToken) {
    //   this.updateList();
    // }
  }

  updateList() {
    this.PanelS
      .aroundList
      .subscribe((data: {
        id: string,
        peerId: string,
        location: number[],
        userName: string
      }[]) => {
        this.userList = [];
        if (data) {
          data.forEach(element => {
            this.userList.push({
              username: element.userName,
              geoLabel: element.location.join(" X "),
              peerId: element.peerId
            });
          })
        }
      })

  }

  call(peerId) {
    console.log('calling peerId ', peerId);

  }

}
