import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login, AuthToken, LoggedUser } from '../interface/user';
import { Observable, of, throwError } from 'rxjs';
import { tap, mapTo, catchError, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentRoute;

  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';


  private loggedUser;

  private endpoint = environment.baseUrl + '/user';
  private routes = {
    login: this.endpoint + '/login',
    logout: this.endpoint + '/logout',
    refreshToken: this.endpoint + '/refresh-token',
    create: this.endpoint + '/'
  };

  constructor(private _http: HttpClient, private router: Router) { }

  public login(login: Login): Observable<boolean | Error> {
    const url = this.routes.login;
    return this._http.post<AuthToken>(url, login).pipe(
      tap(resp => { this.doLoginUser(resp) }),
      mapTo(true),
      catchError(err => {
        throw err;
      })
    );
  }

  public refreshToken(): Observable<any | Error> {
    const url = this.routes.refreshToken;
    return this._http.post<AuthToken>(url, { refreshtoken: this.getRefreshToken() }).pipe(
      tap(resp => { this.doLoginUser(resp) }),
      catchError(err => {console.log(err); return throwError(err)})
    );
  }

  public logout(): Observable<any | Error> {
    const url = this.routes.logout;
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.router.navigate(['/user/login'])
    return this._http.get(url);
  }

  public isLoggedIn() {
    return !!this.getJwtToken();
  }

  public doLoginUser(res: AuthToken) {
    localStorage.setItem(this.JWT_TOKEN, res.token)
    localStorage.setItem(this.REFRESH_TOKEN, res.refreshtoken)
  }

  public getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public getLoggedUser() {
    if (this.loggedUser)
      return this.loggedUser as LoggedUser;
    this.loggedUser = this.decodePayloadJwt();
    return this.loggedUser as LoggedUser;
  }

  private decodePayloadJwt(): LoggedUser | void {
    try {
      return jwt_decode(this.getJwtToken());
    } catch (error) {
      return null;
    }
  }

}
