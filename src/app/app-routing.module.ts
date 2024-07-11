import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LineChartComponent } from './line-chart/line-chart.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'line-chart/:id',
    component: LineChartComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**', // wildcard route for a 404 page
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
