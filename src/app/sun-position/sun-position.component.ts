import { Component, OnInit } from '@angular/core';
import * as Sun from 'suncalc';

import {CoordinatesService, Coords} from '../shared/coordinates.service'
import { DateService } from '../shared/date.service';
@Component({
  selector: 'app-sun-position',
  templateUrl: './sun-position.component.html',
  styleUrls: ['./sun-position.component.sass']
})
export class SunPositionComponent implements OnInit {
  constructor(private coordinatesService: CoordinatesService, private dateService: DateService) { }
  position:string = '14\xB0'
  ngOnInit(): void {
    setInterval(()=> {
      this.coordinatesService.getCoordinates();
    },1000 * 60);
    
    this.coordinatesService.coordsObs.subscribe((coords: Coords)=>{
      console.log('getting new position');
      const angleRads = Sun.getPosition(new Date(), coords.latitude, coords.longitude).altitude;
      this.position = Math.round(angleRads * 180 / Math.PI) + '\xb0';
      });
  }

}
