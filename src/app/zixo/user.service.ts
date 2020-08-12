import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ZixoUserService {
    private url: string = 'https://wallet.zixo.io/v1/';
    private token: string;

    constructor(
        private HttpClient: HttpClient
    ) {
        this.token = localStorage.getItem("zixoToken");
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
                this.storeToken(data.token);
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
                this.storeToken(data.token);
                resolve();
            });
        });
    }

    authenticate() {
        return this.token || false;
    }

    storeToken(token) {
        if (token !== undefined) {
            localStorage.setItem("zixoToken", token);
            this.token = token;
        }
    }

    private https(target: string, data: any) {
        return this.HttpClient.post(this.url + target, data);
    }
}