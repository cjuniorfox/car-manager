import { Injectable } from '@angular/core';
import { CarroModel } from '../model/carro-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  ep = { cadastro: 'carro' };

  constructor(private http: HttpClient) { }

  cadastrar(carro: CarroModel) {
    console.warn(carro);
    let id:Object;
    return this.http.post<CarroModel>(environment.baseUrl + this.ep.cadastro, carro);
  }

}
