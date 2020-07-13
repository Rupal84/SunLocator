import { Component, OnInit } from '@angular/core';
import { SunService } from '../shared/sun.service';
import { CoordinatesService, Coords } from '../shared/coordinates.service';

@Component({
  selector: 'app-sun-chart',
  templateUrl: './sun-chart.component.html',
  styleUrls: ['./sun-chart.component.sass']
})
export class SunChartComponent implements OnInit{
  data = [];
  ngOnInit() {
    this.coordService.getCoordinates();
    this.coordService.coordsObs.subscribe(()=>{
      this.data = [];
      this.buildData();
    })
    
  }
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  yScaleMax = 40;
  yScaleMin= -40;
  showXAxisLabel = false;
  referenceLines= [
    {
      name:'Position',
      value: 0
    }
  ]
  xAxisLabel = 'Country';
  yAxisTickFormatting = (value)=>{
    return value + '\xb0';
  }
  showYAxisLabel = false;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#5AA454']
  };
  
  constructor(private sunService: SunService, private coordService: CoordinatesService) {   
  }

  

  public buildData () {
    let referenceDate = new Date(new Date().setHours(6,0,0,0));
    let endDate = new Date(new Date().setHours(20,0,0,0));
    let series = [];
		while (referenceDate <= endDate) {
        series.push({
          name: this.formatTime(referenceDate.getHours() + referenceDate.getMinutes() / 60) ,
          value: this.sunService.getAltitude(referenceDate)
        });
		
			referenceDate.setTime(referenceDate.getTime() + 60*60*1000);
    }
    this.data.push({
      name: 'Position',
      series: series
    })
  }
  
  formatTime = (time: number) => {
    return time < 12 ? time + 'AM' : (time - 12) === 0 ? time + 'PM' : (time - 12) + 'PM';
  }
   
  onSelect(event) {
    console.log(event);
  }

}