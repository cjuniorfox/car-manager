import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  endpoint = environment.baseUrl + '/cliente';
  routes = {
    cliente: this.endpoint + '/',
    search: this.endpoint + '/buscar'
  };

  create(cliente: any) {
    const url = this.routes.cliente;
    return this._http.post(url, cliente);
  }

  list(search: string, pageIndex: number, pageSize: number) {
    const url = this.routes.search +
      '?search=' + search.toLowerCase() + '&index=' + pageIndex + '&size=' + pageSize;
    return this._http.get(url);
  }

  delete(_id: number) {
    const url = this.routes.cliente + _id;
    return this._http.delete(url);
  }

  constructor(private _http: HttpClient) { }
}
