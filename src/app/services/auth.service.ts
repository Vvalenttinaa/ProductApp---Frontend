import { EventEmitter, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from '../models/auth.model';
import { apiEndpoint } from '../constants/constants';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registrationSuccess$: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private tokenService: TokenService, private http: HttpClient) { }

  onRegister(data: IRegister): Observable<IRegisterResponse>{
    return this.http
      .post<IRegisterResponse>(`${apiEndpoint.AuthEndpoint.register}`, data)
      .pipe(
        map((response) => {
          if(response){
          //  this.tokenService.setToken(response.token);
          }
          return response;
        })
      );
  }

  onLogin(data: ILogin): Observable<string> {
    return this.http.post(`${apiEndpoint.AuthEndpoint.login}`, data, { responseType: 'text' });
  }

  onLogout(): void {
    console.log("logout");
    this.tokenService.removeToken();
  }

}
