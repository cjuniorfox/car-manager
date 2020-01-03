import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  endpoint = environment.baseUrl + '/cliente';
  routes = {
    create: this.endpoint + '/'
  };

  create(cliente: any) {
    const url = this.routes.create;
    return this._http.post(url, cliente);
  }

  constructor(private _http: HttpClient) { }
}
