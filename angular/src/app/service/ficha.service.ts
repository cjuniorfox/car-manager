import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { removeEmpty } from '../util/removeEmpty';
import { Search } from '../model/search.model';
import { Ficha } from '../interface/ficha';
import { Observable } from 'rxjs';
import { FichaPagination } from '../interface/ficha-pagination';

@Injectable({
  providedIn: 'root'
})
export class FichaService {


  endpoint = environment.baseUrl + '/ficha';
  routes = {
    ficha: this.endpoint + '/',
    saveFichaEntrada: this.endpoint + '/entrada',
    listar : this.endpoint + '/listar',
    addServico: this.endpoint + '{_id}/add-servico'
  };

  constructor(private _http: HttpClient) { }

  public listar(getQuery: Search):Observable<FichaPagination> {
    const url = this.routes.listar;
    let params = new HttpParams()
    .set('search', getQuery.search)
    .set('index', getQuery.pageIndex.toString())
    .set('size', getQuery.pageSize.toString());
    return this._http.get<FichaPagination>(url,{params});
  }

  public saveFichaEntrada(body) {
    const postRequest = removeEmpty(body);
    const url = this.routes.saveFichaEntrada;
    return this._http.post(url, postRequest);
  }

  public addServico(id,body){
    const postRequest = removeEmpty(body);
    const url = this.routes.addServico.replace('{_id}',id);
    return this._http.post(url,postRequest);
  }

}