import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../service/veiculo.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.scss']
})
export class VeiculoComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }
}
