import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastDetailsComponent } from '../forecast-details/forecast-details.component';

const routes: Routes = [
  {path:'forecast/:zipcode',component:ForecastDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForecastRoutingModule { }
