import { Injectable } from '@angular/core';
import { IStation } from '../Models/istation';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class StationService {
  
  private baseUrl = `${environment.apiUrl}/stations`;

  constructor(private http: HttpClient) {}


   getStations(): Observable<IStation[]> {
    return this.http.get<IStation[]>(this.baseUrl);
  }

  getStation(id: number): Observable<IStation> {
    return this.http.get<IStation>(`${this.baseUrl}/${id}`);
  }

  addStation(station: IStation): Observable<IStation> {
    return this.http.post<IStation>(this.baseUrl, station);
  }
}
