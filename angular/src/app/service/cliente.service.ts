import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interface/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  endpoint = environment.baseUrl + '/cliente';
  routes = {
    cliente: this.endpoint + '/',
    search: this.endpoint + '/buscar'
  };

  get(cliente_id: number) {
    const url = this.routes.cliente + cliente_id;
    return this._http.get<Cliente>(url);
  }

  create(cliente: Cliente) {
    const url = this.routes.cliente;
    return this._http.post(url, cliente);
  }

  patch(cliente_id: string, cliente: Cliente) {
    const url = this.routes.cliente + cliente_id;
    return this._http.patch(url, cliente);
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
