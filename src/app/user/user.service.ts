import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url: string = environment.API_ENDPOINT + 'user/';
    public token: string;

    constructor(
        private HttpClient: HttpClient
    ) {
        this.token = localStorage.getItem("userToken");
    }

    login(emailOrUsername: string, password: string) {
        return new Promise((resolve, reject) => {
            this.https('login', {
                emailOrUsername: emailOrUsername,
                password: password
            }).pipe(
                catchError(_ => {
                    return new BehaviorSubject<{ token: boolean }>({ token: false });
                })
            ).subscribe((data: any) => {
                if (data.token == false) {
                    return reject()
                }
                this.storeToken(data.token)
                resolve();
            })
        });
    }

    register(email: string, username: string, password: string) {
        return new Promise(resolve => {
            this.https('create', {
                email: email,
                user: username,
                password: password
            }).subscribe((data: any) => {
                this.storeToken(data.token)
                resolve();
            });
        });
    }

    storeToken(token) {
        if (token !== undefined) {
            localStorage.setItem("userToken", token);
            this.token = token;
        }
    }

    authenticate() {
        return this.token || false;
    }

    private https(target: string, data: any) {
        return this.HttpClient.post(this.url + target, data);
    }
}