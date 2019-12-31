import { Injectable } from '@angular/core';
import { CarroModel } from '../model/carro-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CarrosList } from '../interface/carros-list';
import { CarroMarcaModelo } from '../interface/carro-marca-modelo';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  convertToMarcaModeloList(carros: CarrosList): CarroMarcaModelo[] {
    let marcaModeloList: CarroMarcaModelo[] = new Array<CarroMarcaModelo>();
    carros.carros.map(c => {
      if (c.modelos.length > 0) {
        c.modelos.map(m => {
          marcaModeloList.push(
            { marca: c.marca, id_marca: c._id, modelo: m.nome, id_modelo: m._id }
          );
        })
      } else {
        marcaModeloList.push({ marca: c.marca, id_marca: c._id, modelo: 'Nenhum modelo cadastrado', id_modelo: null });;
      }
    });
    return marcaModeloList;
  }

  ep = {
    cadastro: 'carro',
    listar: 'carro/buscar',
    marcaModelo: 'carro/marca-modelo',
    marca: 'carro/marca'
  };

  constructor(private http: HttpClient) { }

  listar(search: String) {
    return this.http.get<CarrosList>(`${environment.baseUrl}${this.ep.listar}/${search ? search : ''}`);
  }

  listarPorMarca(search: string) {
    const endpoint = `${environment.baseUrl}${this.ep.marca}/${search ? search : ''}`;
    return this.http.get<CarrosList>(endpoint);
  }

  getMarcaModelo(marcaModelo: String) {
    return this.http.get<CarroModel>(environment.baseUrl + this.ep.marcaModelo + '/' + marcaModelo);
  }

  insertMarcaModelo(marcaModelo: { marca: string, modelo: string }) {
    const endpoint = `${environment.baseUrl}${this.ep.marcaModelo}`;
    return this.http.post<CarroModel>(endpoint, marcaModelo);
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
