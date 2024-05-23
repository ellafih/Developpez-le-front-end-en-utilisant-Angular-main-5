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
    //this.olympics$.subscribe(data => {
      //this.single = data;
    //});
    this.olympicService.getOlympics().subscribe(data => {
      this.single = data;
    });;
  }

  single: any[] = [];

  // options
    showLegend: boolean = true;
    //showLabels: boolean = true;
    explodeSlices: boolean = false;
    doughnut: boolean = false;
   // showLegend = true;
    //showLabels = true;
    //isDoughnut = true;
   legendPosition = 'below';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}




