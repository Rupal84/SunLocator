import { OnInit, Injectable } from '@angular/core';
import * as Sun from 'suncalc';
import { CoordinatesService } from './coordinates.service';

@Injectable()
export class SunService implements OnInit{
    constructor(private coordService: CoordinatesService){}
ngOnInit() {
}
getAltitude(date: Date) {
    const {latitude, longitude} = this.coordService.coords;
    return Sun.getPosition(
            date,
            latitude,
            longitude
        ).altitude * 180 / Math.PI;       
    };
}




