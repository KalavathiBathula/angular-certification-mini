import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private httpClient: HttpClient) { }

api_url = 'http://api.openweathermap.org/data/2.5/';
id = '5a4b2d457ecbef9eb2a71e480b947604';

getWeatherzipcodeDetails(zipCode:string){
  return this.httpClient.get(this.api_url + 'weather?zip='+zipCode+',in&appid='+this.id);
}

getForeCastWeatherDetails(zipCode:string) {
  return this.httpClient.get(this.api_url + 'forecast/daily?zip='+zipCode+',in&appid='+this.id);
}

}
