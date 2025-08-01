import { Injectable } from '@angular/core';
import { ITrip } from '../Models/itrip';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Trip {


  private apiUrl = `${environment.apiUrl}/trips`;

  constructor(private http: HttpClient) {}

  getTrips(): Observable<ITrip[]> {
    return this.http.get<ITrip[]>(this.apiUrl);
  }

  getStations(): Observable<string[]> {
    return this.getTrips().pipe(
      map(trips => [...new Set(trips.flatMap(t => [t.from, t.to]))])
    );
  }
  
}
