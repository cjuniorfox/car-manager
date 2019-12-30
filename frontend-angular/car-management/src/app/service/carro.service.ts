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
    listar: 'carro/buscar',
    marcaModelo: 'carro/marca-modelo',
    marca : 'carro/marca'
  };

  constructor(private http: HttpClient) { }

  listar(search: String) {
    return this.http.get<CarrosList>(`${environment.baseUrl}${this.ep.listar}/${search?search:''}`);
  }

  listarPorMarca(search:string) {
    const endpoint = `${environment.baseUrl}${this.ep.marca}/${search?search:''}`;
    return this.http.get<CarroModel[]>(endpoint);
  }

  getMarcaModelo(marcaModelo: String) {
    return this.http.get<CarroModel>(environment.baseUrl + this.ep.marcaModelo + '/' + marcaModelo);
  }

  insert(carro: CarroModel) {
    return this.http.post<CarroModel>(environment.baseUrl + this.ep.cadastro, carro);
  }
  patch(carro: CarroModel, id: Number) {
    //Converte o objeto para array de acordo com o serviço.
    let arr = [];
    Object.keys(carro).map(function (key) {
      if (carro[key] && carro[key].length > 0) {
        arr.push({ propName: key, value: carro[key] })
      }
      console.log(arr);
    });
    return this.http.patch<CarroModel>(environment.baseUrl + this.ep.cadastro + '/' + id, arr);
  }
  delete(id: Number) {
    return this.http.delete(environment.baseUrl + this.ep.cadastro + '/' + id);
  }
}
