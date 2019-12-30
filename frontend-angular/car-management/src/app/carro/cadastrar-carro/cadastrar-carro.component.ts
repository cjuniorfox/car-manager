import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { startWith, map, filter, debounceTime, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { CarroModel } from 'src/app/model/carro-model';
import { CarroService } from 'src/app/service/carro.service';


@Component({
  selector: 'app-cadastrar-carro',
  templateUrl: './cadastrar-carro.component.html',
  styleUrls: ['./cadastrar-carro.component.scss']
})
export class CadastrarCarroComponent implements OnInit {

  cadastroCarroForm : FormGroup;
  formControlCarro = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  carros: CarroModel[];
  filteredCarros: Observable<CarroModel[]>;

  constructor(
    private location: Location,
    private carroService: CarroService,
    private formBuilder: FormBuilder
  ) { 
    this.cadastroCarroForm = this.formBuilder.group({
      marca: ['', Validators.required]
    });
  };

  ngOnInit() {
    this.search();
  }

  search() {
    this.cadastroCarroForm.controls.marca.valueChanges.pipe(
      debounceTime(500),
      switchMap(searchTerm => this.carroService.listarPorMarca(searchTerm))
    ).subscribe(result => this.carros = result);

  }
  
}
