import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { removeEmpty } from '../util/removeEmpty';

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
    const postRequest = removeEmpty(body);
    console.log(postRequest)
    const url = this.routes.saveFichaEntrada;
    return this._http.post(url, postRequest);
  }
}
