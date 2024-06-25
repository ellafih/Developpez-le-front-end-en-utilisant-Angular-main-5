import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of();

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(data => {
    var a = [];
    this.countries = data.length;
    for (let country of data){
      a.push({"name":country.country,"value":country.totalmedals})
      this.cities = country.participations.length
    };
     this.single = a;
    });
  }


  onSelect(event: { name: any; }): void {
    console.log(event);
    // Navigate to the line chart with the selected country
    // this.router.navigate(['/line-chart'], { queryParams: { country: event.name } });
    this.router.navigate(['/line-chart', event],);
  }



  countries: number = 0;
  cities: number = 0;
  single: any[] = [];
  isLoading: boolean = true;
  error: string = '';
  // options
  showLabels: boolean = true;
  colorScheme: Color = {
    domain: ['#956065', '#b8cbe7', '#89A1DB', '#793e52', '#9780A1'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Country Color',
  };


}




