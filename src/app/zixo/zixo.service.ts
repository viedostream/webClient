import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IChannelPaymentResponse, IChannelResponse, ICreateChannelResponse, IJoinChannelResponse } from './responses.d';

import { BehaviorSubject } from 'rxjs';
import { HashTable } from './../assets/hashTable';
import { Injectable } from "@angular/core"
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ZixoService {
    private url: string = environment.ZIXO_ENDPOINT;
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

    logout() {
        this.token = null;
        localStorage.removeItem("zixoToken");
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

    channel_create(satoshis: number, lockSeconds: number): Promise<ICreateChannelResponse> {
        return new Promise(
            (
                resolve: (result: ICreateChannelResponse) => void,
                reject: (err: Error) => void
            ) => {
                this.https("channel/create", { satoshis, lockSeconds })
                    .subscribe((data: ICreateChannelResponse) => {
                        resolve(data);
                    });
            }
        );
    }

    channel_join(channelId: string): Promise<IJoinChannelResponse> {
        return new Promise(
            (
                resolve: (result: IJoinChannelResponse) => void,
                reject: (err: Error) => void
            ) => {
                this.https("channel/join", { channelId })
                    .subscribe((data: IJoinChannelResponse) => {
                        resolve(data);
                    });
            }
        );
    }

    channel_invoice_create(
        channelId: string,
        satoshis: number,
        description: string
    ): Promise<IChannelPaymentResponse> {
        return new Promise(
            (
                resolve: (result: IChannelPaymentResponse) => void,
                reject: (err: Error) => void
            ): void => {

                this.https("channel/payment/invoice", { channelId, satoshis, description })
                    .subscribe((data: IChannelPaymentResponse) => {
                        resolve(data);
                    });
            }
        );
    }

    Channel_close(channelId: string): Promise<IChannelPaymentResponse> {
        return new Promise(
            (
                resolve: (result: IChannelPaymentResponse) => void,
                reject: (err: Error) => void
            ): void => {
                this.https("channel/close", { channelId })
                    .subscribe((data: IChannelPaymentResponse) => {
                        resolve(data);
                    });
            }
        );
    }

    channel_getPayment(
        channelId: string,
        paymentId: string
    ): Promise<IChannelPaymentResponse> {
        return new Promise(
            (
                resolve: (result: IChannelPaymentResponse) => void,
                reject: (err: Error) => void
            ): void => {

                this.httpsGet(`channel/payment/${channelId}/${paymentId}`)
                    .subscribe((data: IChannelPaymentResponse) => {
                        resolve(data);
                    });
            }
        );
    }

    private storeToken(token) {
        if (token !== undefined) {
            localStorage.setItem("zixoToken", token);
            this.token = token;
        }
    }

    private https(target: string, data: any) {
        if (!this.authenticate()) {
            return this.HttpClient.post(this.url + target, data);
        }
        return this.HttpClient.post(this.url + target, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                token: this.token
            })
        });
    }

    private httpsGet(target: string) {
        if (!this.authenticate()) {
            return this.HttpClient.get(this.url + target);
        }
        return this.HttpClient.get(this.url + target, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                token: this.token
            })
        });
    }
}