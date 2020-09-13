import {Component, Input, OnInit} from '@angular/core';

export interface LocationInfo {
    premises: Premises;
    building: Building;
    address: string;
}

export interface Premises {
    title: string;
    subtitle: string;
}

export interface Building {
    title: string;
    subtitle: string;
}

@Component({
    selector: 'hc-location-info',
    templateUrl: './location-info.component.html',
    styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit {

    @Input()
    set locationInfo(value) {
        this._locationInfo = value;
    }
    get locationInfo(): LocationInfo {
        return this._locationInfo;
    }
    _locationInfo: LocationInfo;

    constructor() {
    }

    ngOnInit() {
    }

}
