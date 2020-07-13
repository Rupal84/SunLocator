import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.sass']
})
export class DateComponent implements OnInit {

  constructor(private dateService: DateService) { }
  date: string;
  isToday: boolean;
  ngOnInit(): void {
    this.date = this.onClickToday();
  }
  onClickPrev() {
    let dt:Date = new Date(this.date);
    let output:Date = new Date();
    output.setDate(dt.getDate()-1);
    this.date = output.toDateString();
    this.dateService.updateDate(new Date(output));
  }
  onClickToday() {
    let dt:Date = new Date();
    this.dateService.updateDate(dt);
    return dt.toDateString();
  }
  onClickNext() {
    let dt:Date = new Date(this.date);
    let output:Date = new Date();
    output.setDate(dt.getDate()+1);
    this.date = output.toDateString();
    this.dateService.updateDate(new Date(output));
  }
}
