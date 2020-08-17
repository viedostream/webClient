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

  constructor(
    private UserS: ZixoService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
