import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export class DateService implements OnInit{
    dateChanged = new Subject<Date>();
    constructor( ){}
ngOnInit() {
}
    updateDate(date: Date) {
        this.dateChanged.next(date);
    }
}