import { Injectable } from '@angular/core';
import { CarroModel } from '../interface/carro-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CarroMarcaModelo } from '../interface/carro-marca-modelo';
import { CarroListPaginator } from '../interface/carro-list-paginator';
import { updateOps } from '../util/updateOps';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  endpoint = environment.baseUrl + '/carro';
  routes = {
    create: this.endpoint + '/',
    listAstable: this.endpoint + '/buscar',
    marcaModelo: this.endpoint + '/marca-modelo',
    marca: this.endpoint + '/marca',
    modelo: this.endpoint + '/modelo'
  };


  constructor(private http: HttpClient) { }

  listAsTable(search: string, pageIndex: number, pageSize: number) {
    const params = new HttpParams()
      .set('search', search)
      .set('index', pageIndex.toString())
      .set('size', pageSize.toString());
    const url = this.routes.listAstable;
    return this.http.get<CarroListPaginator>(url, { params });
  }

  listMarcas(search: string) {
    let params = new HttpParams().set('search', search);
    const url = this.routes.marca;
    return this.http.get<CarroMarcaModelo[]>(url, { params });
  }

  create(marcaModelo: { marca: string, modelo: string }) {
    const url = this.routes.create;
    return this.http.post<CarroModel>(url, marcaModelo);
  }

  updateMarca(carro, id: number) {
    //Converte o objeto para array de acordo com o serviço.
    const url = this.routes.marca + '/' + id;
    return this.http.patch<CarroModel>(url, updateOps(carro));
  }
  updateModelo(modelo, id: number) {
    //Converte o objeto para array de acordo com o serviço.
    const url = this.routes.modelo + '/' + id;
    return this.http.patch<CarroModel>(url, updateOps(modelo));
  }
  deleteModelo(id: Number) {
    const url = this.routes.modelo + '/' + id;
    return this.http.delete(url);
  }
}