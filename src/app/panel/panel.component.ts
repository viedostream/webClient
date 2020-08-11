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
  }[] = [
      {
        username: 'miladm',
        geo: '1546545 X 5456415'
      },
      {
        username: 'mohammadreza',
        geo: '1546545 X 5456415'
      },
      {
        username: 'meysam',
        geo: '1546545 X 5456415'
      }
    ];


  constructor(
    public zixoUserS: ZixoUserService,
    public userS: UserService,
    public PanelS: PanelService
  ) {
    console.log(
      zixoUserS.authenticate()
    );
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
    console.log(navigator);

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating…');
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.position = position;
        console.log('updating geo');

        this.PanelS.updateData("0", this.position?.coords?.latitude, position?.coords?.longitude)
          .then(response => {
            console.log(response);
          })
          .catch(_ => {
            console.log('error');
          })

        this.PanelS.getAround(this.position?.coords?.latitude, position?.coords?.longitude).then(data => {
          console.log(data);
          
        })



      }, error => { });
    }
  }

}
