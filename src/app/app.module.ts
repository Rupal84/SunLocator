import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SunPositionComponent } from './sun-position/sun-position.component';
import { CurrentLocationComponent } from './current-location/current-location.component';
import { CoordinatesService } from './shared/coordinates.service';
import { DateComponent } from './date/date.component';
import { TimesComponent } from './times/times.component';
import { DateService } from './shared/date.service';
import { SunChartComponent } from './sun-chart/sun-chart.component';
import { SunService } from './shared/sun.service';

@NgModule({
  declarations: [
    AppComponent,
    SunPositionComponent,
    CurrentLocationComponent,
    DateComponent,
    TimesComponent,
    SunChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [CoordinatesService, DateService, SunService],
  bootstrap: [AppComponent]
})
export class AppModule { }
