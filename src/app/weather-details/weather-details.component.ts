import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { WeatherData } from './weatherData';


@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {

  weatherDetails: any = new Array();
  zipCode: any = '';
  private subscription = new Subscription();
  constructor(private weatherService: WeatherService,
    private route: Router,
    private toast: ToastrService,) { }

  ngOnInit(): void {
    this.getCurrentWeatherData();
  }

  // get the list of all weather report details
  async getCurrentWeatherData() {    
    const weatherLists = await JSON.parse(localStorage.getItem('weatherLists')!);
    if (weatherLists) this.weatherDetails = weatherLists;
  }

  // submit new zipcode
  getCurrentWeatherZipCode(zipCode: string) {
    if (zipCode && zipCode !== '') {
      let ifExists = false;
      this.weatherDetails.forEach((resp: WeatherData) => {
        if (resp.zipcode === zipCode) ifExists = true;
      });
      if (!ifExists) {
        this.subscription.add(this.weatherService.getWeatherzipcodeDetails(zipCode).subscribe(weatherData => {
            if(weatherData) {
              weatherData = { ...weatherData, zipcode: zipCode };
              this.weatherDetails.push(weatherData);
              localStorage.setItem(
                'weatherLists',
                JSON.stringify(this.weatherDetails)
              );
            }
            this.zipCode = '';
            this.toast.success("zipcode added successfully");
          },
          () => {
            this.toast.warning(
              'invalid zipcode: ' +
                zipCode +
                ', or data not availble for this zipcode.'
            );
            this.zipCode = '';
          }
        ));
      } else {
        this.zipCode = '';
        this.toast.warning("zipcode already exists.");
      }
    } else {
      this.toast.warning("Please enter zipcode.");
    }
  }

  //remove selected weather details
  remove(zipcode: string) {
    if (this.weatherDetails && this.weatherDetails.length > 0) {
      this.weatherDetails = this.weatherDetails.filter(
        (data: WeatherData) => data.zipcode !== zipcode
      );
      this.toast.success("Removed Succesfully");
      localStorage.setItem(
        'weatherLists',
        JSON.stringify(this.weatherDetails)
      );

    }
  }

  //unsubscribe the observable
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
