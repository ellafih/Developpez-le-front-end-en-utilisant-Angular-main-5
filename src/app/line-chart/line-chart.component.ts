import { Participation } from './../core/models/Participation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from '../core/services/olympic.service';
import { Olympic } from '../core/models/Olympic';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of();
  public participation$: Observable<Participation[]> = of();
  data: any[] = [];
  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = '';
  // timeline: boolean = true;

  colorScheme: Color = {
    domain: ['#956065', '#b8cbe7', '#89A1DB', '#793e52', '#9780A1'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Country Participations',
  };
  country!: string;
  participation!: string;
  medals: number = 0;
  entries: number = 0;
  athletes: number = 0;


  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.country = params['name'];
    });
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(data => {
      this.processOlympicData(data);
    });
  }

  private processOlympicData(data: Olympic[]): void {
    const filteredData = data.filter(item => item.country === this.country);
    const transformedData = filteredData.map(country => ({
      name: country.country,
      series: country.participations.map(participation => ({
        name: participation.year.toString(),
        value: participation.medalsCount
      }))
    }));

    this.data = transformedData;

    if (filteredData.length > 0) {
      const selectedCountry = filteredData[0];
      this.medals = selectedCountry.totalmedals;
      this.country = selectedCountry.country;
      this.entries = selectedCountry.participations.length;
      this.athletes = selectedCountry.totalatheletes
    }
  }

}

