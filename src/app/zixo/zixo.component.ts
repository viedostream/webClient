import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ZixoService } from './zixo.service';

@Component({
  selector: 'app-zixo',
  templateUrl: './zixo.component.html',
  styleUrls: ['./zixo.component.scss']
})
export class ZixoComponent implements OnInit {

  tab: string = "login";
  dangerMessage: string = ''
  mnemonic: string;
  address: string;

  constructor(
    public UserS: ZixoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.UserS.authenticate()) {
      this.router.navigate(['panel'])
    }
  }

  registerSubmit(event) {
    let data = {
      email: event.target[0].value,
      username: event.target[1].value,
      password: event.target[2].value
    }
    this.UserS.register(data.email, data.username, data.password).then((result: any) => {
      console.log(result);
      if (result?.mnemonic) {
        this.mnemonic = result.mnemonic;
      }
      this.UserS.getAddress().then((address: string) => {
        this.address = address;
      })
    });
    event.preventDefault();
  }

  loginSubmit(event) {
    let data = {
      usernameOrEmail: event.target[0].value,
      password: event.target[1].value
    }
    console.log(this.UserS.authenticate());

    this.UserS.login(data.usernameOrEmail, data.password).then(_ => this.login()).catch(_ => this.loginFail());
    event.preventDefault();
  }

  login() {
    if (this.UserS.authenticate()) {
      this.router.navigate(['panel'])
    }
  }

  loginFail() {
    this.dangerMessage = "Username and password not match!";
    setTimeout(() => {
      this.dangerMessage = "";
    }, 5000);
  }
}
