import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interface/cliente';
import { map } from 'rxjs/operators';

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

  search(search: string, pageIndex: number, pageSize: number){
    const url = this.routes.search;
    let params = new HttpParams()
    .set('search', search)
    .set('index', pageIndex.toString())
    .set('size', pageSize.toString());
    return this._http.get<any>(url,{params});
  }

  delete(_id: number) {
    const url = this.routes.cliente + _id;
    return this._http.delete(url);
  }

  mascaraTelefone(telefone:string){
    return (telefone.length==10 ? "(00) 0000-0000" : "(00) 00000-0000")
  }

  constructor(private _http: HttpClient) { }
}
