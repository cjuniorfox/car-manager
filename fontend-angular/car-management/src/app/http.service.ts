import { Injectable } from '@angular/core';
import { FichaModel } from './model/ficha.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseContext = 'http://localhost:3000';

  routes = {
    fichaEntrada: { route: '/api/ficha', method: 'POST' }
  }

  constructor(private _http: HttpClient) { }

  setFichaEntrada(body: FichaModel) {
    return this._http.post<FichaModel>(this.routes.fichaEntrada.route, body);
  }
}
