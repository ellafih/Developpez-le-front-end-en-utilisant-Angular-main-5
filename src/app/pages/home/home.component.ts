import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of();

  constructor(private olympicService: OlympicService) {}

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

  onSelect(event: any): void {
    console.log(event);
  }

  countries: number = 0;
  cities: number = 0;
  single: any[] = [];
  isLoading: boolean = true;
  error: string = '';
  // options
  showLabels: boolean = true;
  colorScheme = {
    domain: ['#956065', '#A10A28', '#C7B42C', '#AAAAAA']
  };


}




