import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from '../core/services/olympic.service';
import { Participation } from '../core/models/Participation';
import { Olympic } from '../core/models/Olympic';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of();
  data: any[] = [];
  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'X Axis';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Y Axis';
  timeline: boolean = true;

  colorScheme: Color = {
    domain: ['#956065', '#b8cbe7', '#89A1DB', '#793e52', '#9780A1'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Country Participations',
  };
  country!: string;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.country = params['name'];
    });
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(data => {
        // Process and return the data for the line chart based on the selected category
        const filteredData = data.filter(item => item.country === this.country);
        this.data = [{"name" : "France", "series" : [{"name" : "2016", "value":1}]}]
        /*data = filteredData.map(item => ({
          name: item.name,
          series: item.series
        } as unknown as Participation));
      var a = [];
      for (let participation of data){
        a.push({"name":participation.year,"value":participation.medalsCount})
      };
       this.data = a;
       */
      });
  }


}

