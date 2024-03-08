import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { apiEndpoint } from '../constants/constants';
import { ISaveTypeResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  findIdByName(name: string): Observable<number> {
    return this.http.get<number>(`${apiEndpoint.TypeEndpoint.findIdByName}/${name}`);
  }

  exist(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${apiEndpoint.TypeEndpoint.exist}/${name}`);
  }

  save(data: any): Observable<ISaveTypeResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const requestData = {
      name: data
    };

    return this.http.post<ISaveTypeResponse>(`${apiEndpoint.TypeEndpoint.save}`, requestData, httpOptions);
  }

}
