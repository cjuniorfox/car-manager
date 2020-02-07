import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { removeEmpty } from '../util/removeEmpty';
import { Ficha } from '../interface/ficha';
import { Observable } from 'rxjs';
import { FichaPagination } from '../interface/ficha-pagination';
import { updateOps } from '../util/updateOps';
import { SearchFicha } from '../model/searchFicha.model';

@Injectable({
  providedIn: 'root'
})
export class FichaService {


  endpoint = environment.baseUrl + '/ficha';
  routes = {
    ficha: this.endpoint + '/',
    saveFichaEntrada: this.endpoint + '/entrada',
    listar: this.endpoint + '/listar',
    addServico: this.endpoint + '/{_id}/add-servico',
    putServico: this.endpoint + '/{_id}/{servico._id}',
    finalizar: this.endpoint + '/{_id}/finalizar',
    registrarRetorno: this.endpoint + '/{_id}/registrar-retorno'
  };

  constructor(
    private _http: HttpClient
  ) { }

  public get(fichaId, servicoId): Observable<Ficha> {
    let url = this.routes.ficha + fichaId;
    if (servicoId)
      url = url + '/' + servicoId;
    return this._http.get<Ficha>(url);
  }

  public patch(fichaId, ficha) {
    const updFicha = updateOps(removeEmpty(ficha));
    const url = this.routes.ficha + fichaId;
    return this._http.patch(url, updFicha);
  }

  public put(fichaId, ficha) {
    const url = this.routes.ficha + fichaId;
    const postRequest = removeEmpty(ficha);
    return this._http.put(url, postRequest);
  }

  public listar(getQuery: SearchFicha): Observable<FichaPagination> {
    const url = this.routes.listar;
    let params = new HttpParams()
      .set('search', getQuery.search)
      .set('index', getQuery.pageIndex.toString())
      .set('size', getQuery.pageSize.toString())
      .set('ativas', getQuery.ativas.toString());
    return this._http.get<FichaPagination>(url, { params });
  }

  public saveFichaEntrada(body) {
    const postRequest = removeEmpty(body);
    const url = this.routes.saveFichaEntrada;
    return this._http.post(url, postRequest);
  }

  public addServico(id: string, body: any) {
    const postRequest = removeEmpty(body);
    const url = this.routes.addServico.replace('{_id}', id);
    return this._http.post(url, postRequest);
  }

  public finalizar(id: string, dataFinalizacao: Date): Observable<any> {
    const postRequest = { at: dataFinalizacao };
    const url = this.routes.finalizar.replace('{_id}', id);
    return this._http.post(url, postRequest)
  }

  public registrarRetorno(id: string, retorno: { data: Date }): Observable<any> {
    const url = this.routes.registrarRetorno.replace('{_id}', id);
    return this._http.post(url, retorno)
    throw new Error("Method not implemented.");
  }

  public putServico(id: string, servicoId: string, body: any) {
    const postRequest = removeEmpty(body);
    const url = this.routes.putServico.replace('{_id}', id).replace('{servico._id}', servicoId);
    return this._http.put(url, postRequest);
  }


}
