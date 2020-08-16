import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  tab: string = "login";
  dangerMessage: string = ''

  constructor(
    private UserS: UserService,
    private router: Router
  ) {
    this.login();
  }

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

  registerSubmit(event) {
    let data = {
      email: event.target[0].value,
      username: event.target[1].value,
      password: event.target[2].value
    }
    this.UserS.register(data.email, data.username, data.password).then(_ => this.login());
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
