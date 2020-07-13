import { Component, OnInit } from '@angular/core';
import { CoordinatesService, Coords } from '../shared/coordinates.service';
import * as suncalc from 'suncalc';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.sass']
})
export class TimesComponent implements OnInit {

  constructor(private coordinatesService: CoordinatesService, private dateService: DateService) { }
  date: Date = new Date();
  longitude: number;
  latitude: number;
  sunriseStart: string= '';
  sunriseEnd: string = '';
  solarNoon: string = '';
  sunsetStart: string = '';
  sunsetEnd: string = '';
  uvbStart: string = '';
  uvbEnd: string = '';
  ngOnInit(): void {
    this.coordinatesService.coordsObs.subscribe((coords: Coords)=>{
      this.updateTimes(this.date, coords.latitude, coords.longitude);
    });
    this.dateService.dateChanged.subscribe((date)=> {
      this.updateTimes(date, this.latitude, this.longitude);
    })
  }

  updateTimes(date: Date, latitude: number, longitude: number) {
    this.date = date;
    this.longitude = longitude;
    this.latitude = latitude;
    if (date === null || latitude === null || longitude === null) {
      return ;
    }
    const times = suncalc.getTimes(new Date(date), latitude, longitude);
      /* tslint:disable:no-string-literal */
      this.sunriseStart = isNaN(times.sunrise.getTime()) ? null : times.sunrise.toLocaleTimeString();
      this.sunriseEnd = isNaN(times.sunriseEnd.getTime()) ? null : times.sunriseEnd.toLocaleTimeString();
      this.solarNoon = isNaN(times.solarNoon.getTime()) ? null : times.solarNoon.toLocaleTimeString();
      this.sunsetStart = isNaN(times.sunsetStart.getTime()) ? null : times.sunsetStart.toLocaleTimeString();
      this.sunsetEnd = isNaN(times.sunset.getTime()) ? null : times.sunset.toLocaleTimeString();
      this.uvbStart = !times['uvbStart'] ? null : times['uvbStart'].toLocaleTimeString();
      this.uvbEnd = !times['uvbEnd'] ? null : times['uvbEnd'].toLocaleTimeString();
      /* tslint:enable:no-string-literal */
}

}