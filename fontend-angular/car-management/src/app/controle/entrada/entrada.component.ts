import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { FichaModel } from 'src/app/model/ficha.model';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss']
})
export class EntradaComponent implements OnInit {

  ficha: FichaModel = new FichaModel();

  setorSelect = [
    {value: 'OF', label: 'OF'},
    {value: 'VN', label: 'VN'},
    {value: 'SL', label: 'SL'},
    {value: 'TD', label: 'TD'},
    {value: 'VU', label: 'VU'}
  ];

  text: string;
  responseFicha: FichaModel;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    console.log(this.ficha)
  }

  setFichaEntrada() {
      this._http.setFichaEntrada(this.ficha).subscribe(res => {
        this.responseFicha = res;
      });
  }

}
