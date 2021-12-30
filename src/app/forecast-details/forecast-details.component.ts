import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherService } from '../service/weather.service';
import { ForecastData } from './forecastData';


@Component({
  selector: 'app-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.scss']
})

export class ForecastDetailsComponent implements OnInit, OnDestroy {

  zipCode!: string;
  forCastDataForZip: any;
  private subscription = new Subscription();
  filteredForeCastList = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    this.activatedroute.params.subscribe((data) => {
      this.zipCode = data['zipcode'];
    });
  }


  ngOnInit() {
    this.getFiveDaysForecast();
  }

  // get 5days forecast details
  getFiveDaysForecast() {
    this.subscription.add(this.weatherService.getForeCastWeatherDetails(this.zipCode).subscribe(forecastDetails => {
      this.forCastDataForZip = forecastDetails;
      this.forCastDataForZip.list.forEach((forecastData: ForecastData) => {
        forecastData.dt_txt = new Date(forecastData.dt * 1000);
      });
    }));
  }

  //unsubscribe the Obsevable
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


