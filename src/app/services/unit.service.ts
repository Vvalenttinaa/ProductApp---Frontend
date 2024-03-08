import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';
import { ISaveUnitResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  findIdByName(name: string): Observable<number> {
    return this.http.get<number>(`${apiEndpoint.UnitEndpoint.findIdByName}/${name}`);
  }

  exist(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${apiEndpoint.UnitEndpoint.exist}/${name}`);
  }

  save(data: any): Observable<ISaveUnitResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const requestData = {
      name: data
    };

    return this.http.post<ISaveUnitResponse>(`${apiEndpoint.UnitEndpoint.save}`, requestData, httpOptions);
  }

}
