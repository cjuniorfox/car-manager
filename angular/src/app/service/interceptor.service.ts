import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, filter, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private refreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getJwtToken();
    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req)
      .pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(error);
      }));
  }

  constructor(private authService: AuthService, private router: Router) { }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        'token': token
      }
    })
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    //Se estiver logando, retorna o erro redirecionando para tela de login
    if (request.url.search(this.authService.refreshTokenRoute) != -1) {
      return this.authService.logout();
    }
    //Quando logout, a funcionalidade "limpar token" não é autorizada pelo servidor.
    //Então necessita permitir o "refresh token" para seguir a vida.
    if (request.url.search(this.authService.logoutRoute) != -1) {
      this.refreshing = false;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken();
    }

    if (!this.refreshing) {
      this.refreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.refreshing = false;
          this.refreshTokenSubject.next(token.token);
          return next.handle(this.addToken(request, token.token));
        })
      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
