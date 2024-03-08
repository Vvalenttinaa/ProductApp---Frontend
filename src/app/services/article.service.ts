import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../constants/constants';
import { Article, Article1, IArticleAdd, IArticleAddResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  save(data: IArticleAdd): Observable<IArticleAddResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<IArticleAddResponse>(`${apiEndpoint.ProductEndpoint.addProduct}`, data, httpOptions);
  }

  get(): Observable<Article1[]>{
    return this.http.get<Article1[]>(`${apiEndpoint.ProductEndpoint.getAll}`);
  }
}
