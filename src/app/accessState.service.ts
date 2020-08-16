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
    geoPosition: any;

    constructor(
        // public PanelS: PanelService
    ) {
        this.getGeoLocationAccess();
        this.getMediaAccess();
    }

    getMediaAccess(video: any = { width: 1280, height: 720 }, audio: boolean = true) {
        let navigator = BROWSER.navigator;
        navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
            .then((stream) => {
                this.media.next(true);
                this.mediaStream.next(stream);
            })
            .catch(_ => { this.media.next(false) });
    }

    getGeoLocationAccess() {
        let navigator = BROWSER.navigator;
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(position => {
                this.geoLocation.next(true);
                this.geoPosition = position;
                // this.PanelS.updateData("0", this.geoPosition?.coords?.latitude, position?.coords?.longitude)
                //     .then(response => {

                //     })
                //     .catch(_ => {
                //         console.error('error');
                //     })
            }, error => {
                console.error(error);
                this.geoLocation.next(false);
            });
        }
    }

    getMedia() {

    }

    getLocation() { }
}