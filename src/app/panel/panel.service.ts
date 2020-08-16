import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class PanelService {
    private url: string = environment.API_ENDPOINT + 'geo/';


    constructor(
        private HttpClient: HttpClient,
        private userS: UserService
    ) {

    }

    updateData(peerId: string, lat: number, long: number) {
        return new Promise((resolve, reject) => {
            this.https("update", {
                peerId: peerId,
                latitude: lat,
                longitude: long

            }).subscribe(response => {
                if (!response) {
                    return reject()
                }
                return resolve(response);
            });
        });

    }

    getAround(lat: number, long: number) {
        let queryString = `?latitude=${lat}&longitude=${long}`
        return new Promise((resolve, reject) => {
            this.HttpClient
                .get(this.url + "around" + queryString, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        token: this.userS.token
                    })
                })
                .pipe(
                    catchError(_ => {
                        console.log(_);

                        return new BehaviorSubject<false>(false);
                    })
                ).subscribe(response => {
                    if (!response) {
                        return reject()
                    }
                    return resolve(response);
                });
        });

    }

    private https(target: string, data: any) {
        return this.HttpClient
            .post(this.url + target, data, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    token: this.userS.token || '6810d23700b0f41c8ce315b4535a5875db1a485ee17394ddfbb1c21eab5e3907'
                })
            })
            .pipe(
                catchError(_ => {
                    console.log(_);

                    return new BehaviorSubject<false>(false);
                })
            );
    }
}