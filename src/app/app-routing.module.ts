import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

const routes: Routes = [
  { path:'weatherDetails',component:WeatherDetailsComponent},
  { path:'', redirectTo:"weatherDetails", pathMatch:"full" }, //the default page will be weatherDetails
  { path:'forecastDetails',loadChildren: () => import('./forecast/forecast.module').then(m => m.ForecastModule)},
  { path: '**', redirectTo: 'weatherDetails' } //wildcard route
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
