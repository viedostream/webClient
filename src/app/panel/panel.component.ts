import * as browser from "../assets/navigator.js";

import { Component, OnInit } from '@angular/core';

import { PanelService } from './panel.service';
import { UserService } from './../user/user.service';
import { ZixoUserService } from './../zixo/user.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  position: any = false;

  userList: {
    username: string,
    geo: string
  }[] = [];


  constructor(
    public zixoUserS: ZixoUserService,
    public userS: UserService,
    public PanelS: PanelService
  ) {
  }

  ngOnInit(): void {
    this.updateGeolocation();

    let zixoToken = this.zixoUserS.authenticate();
    if (zixoToken) {
      this.updateGeolocation();
    }
  }

  updateGeolocation() {
    let navigator = browser.navigator;
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position;
        this.PanelS.updateData("0", this.position?.coords?.latitude, position?.coords?.longitude)
          .then(response => {

          })
          .catch(_ => {
            console.error('error');
          })

        this.PanelS
          .getAround(this.position?.coords?.latitude, position?.coords?.longitude)
          .then((data: {
            id: string,
            peerId: string,
            location: number[]
          }[]) => {
            this.userList = [];
            if (data) {
              data.forEach(element => {
                this.userList.push({
                  username: element.id,
                  geo: element.location.join(" X ")
                });
              })
            }
          })



      }, error => { });
    }
  }

}
