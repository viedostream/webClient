import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AccessStateService } from './../accessState.service';
import { Injectable } from '@angular/core';
import { PeerService } from './../peerjs/peer.service';
import { UserService } from '../user/user.service';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class PanelService {
    private url: string = environment.API_ENDPOINT + 'geo/';
    private requestQuery: string = `?lat=0&lng=0`;
    aroundList: Subject<{
        id: string,
        peerId: string,
        location: number[],
        userName: string
    }[] | object> = new Subject();


    constructor(
        private HttpClient: HttpClient,
        private userS: UserService,
        private PeerS: PeerService,
        private AccessStateS: AccessStateService
    ) {
        this.AccessStateS.getGeo().then(position => {
            this.updateData(position.coords.latitude, position.coords.longitude).then(_=>{
            }).catch(_=>{
            });
        });
        setInterval(_=>{
            this.updateAroundList();
        }, 1000);
    }

    updateData(lat: number, long: number) {
        return new Promise((resolve, reject) => {
            this.PeerS.connect().then(peerId => {
                this.https("update", {
                    peerId: peerId,
                    location: {
                        lat: lat,
                        lng: long
                    }
                }).subscribe(response => {
                    if (!response) {
                        return reject()
                    }
                    return resolve(response);
                });
            });
        });
    }

    getAround(lat: number, long: number) {
        this.requestQuery = `?lat=${lat}&lng=${long}`;
        this.updateAroundList();
        return this.aroundList;
    }

    updateAroundList() {
        this.HttpClient
            .get(this.url + "around" + this.requestQuery, {
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

                } else {
                    this.aroundList.next(response);
                }
            });
    }

    private https(target: string, data: any) {
        return this.HttpClient
            .post(this.url + target, data, {
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
            );
    }
}