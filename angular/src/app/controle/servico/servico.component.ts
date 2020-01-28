import { Component, OnInit, Inject } from '@angular/core';
import { Ficha } from 'src/app/interface/ficha';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.scss']
})
export class ServicoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:Ficha) { }

  ngOnInit() {
  }
  
}
