import { Component, OnInit } from '@angular/core';
import { CoordinatesService, Coords } from '../shared/coordinates.service';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.sass']
})
export class CurrentLocationComponent implements OnInit {

  longitude:string =  '';
  lattitude:string = '';
  constructor(private coordinatesService: CoordinatesService) { }

  ngOnInit(): void {
    this.coordinatesService.getCoordinates();
    this.coordinatesService.coordsObs.subscribe((coords: Coords)=> {
      let longitude = this.formatDegrees(Math.abs(coords.longitude));
      let latitude = this.formatDegrees(Math.abs(coords.latitude));
      this.longitude = coords.longitude > 0 ? longitude + ' E' : longitude + ' W';
      this.lattitude = coords.latitude > 0 ? latitude + ' N': latitude + ' S';
    })
  }

  onLocateMe() {
    this.coordinatesService.getCoordinates();
  }

  formatDegrees = (
    degrees: number,
    includeMinutes: boolean = true,
    includeSeconds: boolean = false,
  ): string => {

    if (!includeMinutes) {
      return `${Math.round(degrees)}\xb0`;
    } else if (!includeSeconds) {
      const minutes = (degrees % 1) * 60;
      return `${Math.floor(degrees)}\xb0 ${Math.round(minutes)}'`;
    } else {
      const minutes = (degrees % 1) * 60;
      const seconds = ((degrees * 60) % 1) * 60;
      return `${Math.floor(degrees)}\xb0 ${Math.floor(minutes)}' ${Math.round(seconds)}"`;
    }
  };

}
