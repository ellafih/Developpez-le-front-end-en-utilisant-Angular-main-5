import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  countries: number = 0;
  cities: number = 0;
  single: any[] = [];
  isLoading: boolean = true;
  error: string = '';

  // options
  showLabels: boolean = false;
  view: [number, number] = [700, 400];
  colorScheme: Color = {
    domain: ['#956065', '#b8cbe7', '#89A1DB', '#793e52', '#9780A1'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Country Color',
  };

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.loadOlympicsData();
  }

  private loadOlympicsData(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(
      catchError(error => {
        this.error = 'Failed to load Olympics data';
        console.error(this.error, error);
        this.isLoading = false;
        return of([]);
      })
    ).subscribe(data => {
      if (data) {
        this.countries = data.length;
        this.single = data.map(country => {
          if (country.participations && country.participations.length > 0) {
            this.cities = country.participations.length;
            return {
              id: country.id, // Include country id for navigation
              name: country.country,
              value: country.totalmedals
            };
          } else {
            console.warn(`No participations found for country ${country.country}`);
            return null;
          }
        }).filter(item => item !== null);
        this.isLoading = false;
      } else {
        this.error = 'No data available';
        this.isLoading = false;
      }
    });
  }

  onSelect(event: any): void {
    const selectedCountry = this.single.find(country => country.name === event.name);
    if (selectedCountry && selectedCountry.id) {
      this.router.navigate(['/line-chart', selectedCountry.id]);
    } else {
      console.error('Invalid event or id:', event);
      this.error = 'Invalid country selected. Please try again.';
    }
  }
}
