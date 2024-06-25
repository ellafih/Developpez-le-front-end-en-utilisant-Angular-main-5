import { Participation } from './../models/Participation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getLineChartData(participation: string): Observable<Participation> {
    return this.http.get<any[]>(this.olympicUrl).pipe(
      map(data => {
        // Process and return the data for the line chart based on the selected category
        const filteredData = data.filter(item => item.name === participation);
        return filteredData.map(item => ({
          name: item.name,
          series: item.series
        } as unknown as Participation))[0];
      })
    );
  }

}
