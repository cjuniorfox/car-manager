import { Injectable } from '@angular/core';
import { CarroModel } from '../model/carro-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CarrosList } from '../interface/carros-list';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  ep = {
    cadastro: 'carro',
    listar: 'carro/buscar'
  };

  constructor(private http: HttpClient) { }

  listar(search:String) {
    return this.http.post<CarrosList>(environment.baseUrl + this.ep.listar,{search:search});
  }

  cadastrar(carro: CarroModel) {
    let id: Object;
    return this.http.post<CarroModel>(environment.baseUrl + this.ep.cadastro, carro);
  }

}
