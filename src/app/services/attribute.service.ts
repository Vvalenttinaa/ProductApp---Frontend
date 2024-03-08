import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAttributeName, IAttributeName1, IAttributeNameResponse } from '../models/auth.model';
import { Observable, map } from 'rxjs';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient) { }

  onSave(data: IAttributeName): Observable<IAttributeNameResponse>{
    return this.http
      .post<IAttributeNameResponse>(`${apiEndpoint.AttributeNameEndpoint.addAttributeName}`, data)
      .pipe(
        map((response: any) => {
          if(response){
          //  this.tokenService.setToken(response.token);
          }
          return response;
        })
      );
  }

  getAllAttributes(): Observable<IAttributeName1[]> {
    return this.http.get<IAttributeName1[]>(`${apiEndpoint.AttributeNameEndpoint.getAllAttributes}`)
      .pipe(
        map((response: IAttributeName1[]) => {
          return response;
        })
      );
  }
}
