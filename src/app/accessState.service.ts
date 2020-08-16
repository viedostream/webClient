import * as BROWSER from "./assets/navigator.js";

import { BehaviorSubject, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

// import { PanelService } from './panel/panel.service';

@Injectable({
    providedIn: 'root'
})
export class AccessStateService {
    media: BehaviorSubject<boolean> = new BehaviorSubject(false);
    geoLocation: BehaviorSubject<boolean> = new BehaviorSubject(false);
    mediaStream: Subject<any> = new Subject();

    constructor(
    ) {
        // this.getGeo();
        // this.getMedia();
    }

    getMedia(video: any = { width: 1280, height: 720 }, audio: boolean = true) {
        return new Promise((resolve, reject) => {
            let navigator = BROWSER.navigator;
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then((stream) => {
                    this.media.next(true);
                    this.mediaStream.next(stream);
                    return resolve(stream)
                })
                .catch(_ => {
                    this.media.next(false);
                    return reject(false);
                });
        });
    }

    getGeo(): Promise<any> {
        return new Promise((resolve, reject) => {
            let navigator = BROWSER.navigator;
            if (!navigator.geolocation) {
                console.log('Geolocation is not supported by your browser');
                return reject(false);
            } else {
                navigator.geolocation.getCurrentPosition(position => {
                    this.geoLocation.next(true);
                    return resolve(position);
                }, error => {
                    console.error(error);
                    this.geoLocation.next(false);
                    return reject(false);
                });
            }
        });
    }
}