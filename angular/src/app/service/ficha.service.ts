import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  endpoint = environment.baseUrl + '/ficha';
  routes = {
    ficha: this.endpoint + '/',
    saveFichaEntrada: this.endpoint + '/entrada'
  };

  constructor(private _http: HttpClient) { }


  public saveFichaEntrada(body) {
    const url = this.routes.saveFichaEntrada;
    return this._http.post(url, body);
  }
}
