import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  forcast: any;
  city = '';

  constructor(
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) { }


  getWeatherInfo(cityName: any) {
    this.city = cityName.detail.value;
    this.httpClient.get(`https://api.weatherapi.com/v1/forecast.json?q=${cityName.detail.value}&days=7&key=0f18907a2d2d49b6aee142403231405`)
      .subscribe({
        next: (response) => {
          this.forcast = response;
        },
        error: (err) => {
          console.log('Error: ', err);
          this.forcast = undefined;
        }
      });
  }

  getDayName(day: any) {
    return this.datePipe.transform(day.date, 'cccc');
  }
}
