import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export interface Coords {
  latitude: number;
  longitude: number;
}

export class CoordinatesService implements OnInit {
    constructor() {}
    ngOnInit() {
    }
    coordsObs = new Subject<Coords>();
    coords:Coords = null;
    getCoordinates() {
        const successHandler = ({ coords }: { coords: Coords }) => {
            const {latitude, longitude} = coords;
            this.coords = {latitude, longitude};
            this.coordsObs.next({latitude, longitude});
          };
          const errorHandler = (err: PositionError) => {
            console.error(err.message);
          };
          navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    }
}