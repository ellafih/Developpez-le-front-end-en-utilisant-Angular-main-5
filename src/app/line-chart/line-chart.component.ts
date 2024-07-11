import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from '../core/services/olympic.service';
import { Olympic } from '../core/models/Olympic';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = of();
  private subscriptions: Subscription = new Subscription();
  data: any[] = [];
  view: [number, number] = [700, 400];

  // Chart options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Medals Count';

  colorScheme: Color = {
    domain: ['#956065', '#b8cbe7', '#89A1DB', '#793e52', '#9780A1'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Country Participations',
  };

  countryName!: string;
  multi: any[] = [];
  medals: number = 0;
  entries: number = 0;
  athletes: number = 0;
  error: string = '';

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe((params: Params) => {
        const countryId = +params['id'];
        this.loadCountryData(countryId);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadCountryData(countryId: number): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subscriptions.add(
      this.olympics$.subscribe({
        next: (data) => this.processOlympicData(data, countryId),
        error: (err) => {
          console.error('Failed to load Olympic data', err);
          this.error = 'Failed to load Olympic data';
        }
      })
    );
  }

  private processOlympicData(data: Olympic[], countryId: number): void {
    const country = data.find(item => item.id === countryId);
    if (country) {
      this.countryName = country.country;
      this.multi = [{
        name: this.countryName,
        series: country.participations.map(participation => ({
          name: participation.year.toString(),
          value: participation.medalsCount
        }))
      }];
      this.medals = country.totalmedals;
      this.entries = country.participations.length;
      this.athletes = country.totalatheletes;
    } else {
      console.warn(`Country with ID ${countryId} not found in data`);
      this.error = `Country with ID ${countryId} not found.`;
    }
  }
}
