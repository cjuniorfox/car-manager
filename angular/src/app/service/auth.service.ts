import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../interface/user';
import { Observable, of, throwError } from 'rxjs';
import { tap, mapTo, catchError, map } from 'rxjs/operators';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN'

  private endpoint = environment.baseUrl + '/user';
  private routes = {
    login: this.endpoint + '/login',
    create: this.endpoint + '/'
  };

  constructor(private _http: HttpClient) { }

  login(login: Login): Observable<boolean | Error> {
    const url = this.routes.login;
    return this._http.post<Token>(url, login).pipe(
      tap(resp => { this.doLoginUser(resp) }),
      mapTo(true),
      catchError(err=>{
        throw err;
      })
    );
  }

  isLoggedIn(){
    return !!this.getJwtToken();
  }

  private doLoginUser(resToken: Token) {
    localStorage.setItem(this.JWT_TOKEN, resToken['auth-token'])
  }

  private getJwtToken(){
    return localStorage.getItem(this.JWT_TOKEN);
  }

}
