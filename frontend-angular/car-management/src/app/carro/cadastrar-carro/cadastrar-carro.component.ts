import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { CarroModel } from 'src/app/interface/carro-model';
import { CarroService } from 'src/app/service/carro.service';
import { CarroMarcaModelo } from 'src/app/interface/carro-marca-modelo';


@Component({
  selector: 'app-cadastrar-carro',
  templateUrl: './cadastrar-carro.component.html',
  styleUrls: ['./cadastrar-carro.component.scss']
})
export class CadastrarCarroComponent implements OnInit {

  cadastroCarroForm: FormGroup;
  marca;
  modelo;
  carros: CarroMarcaModelo[];
  requestError:string;

  constructor(
    private location: Location,
    private carroService: CarroService,
    private formBuilder: FormBuilder
  ) {
    this.cadastroCarroForm = this.formBuilder.group({
      marca: ['', [Validators.required, Validators.minLength(3)]],
      modelo: ['', Validators.required]
    });
    this.marca = this.cadastroCarroForm.controls.marca;
    this.modelo = this.cadastroCarroForm.controls.modelo;
  };

  ngOnInit() {
    this.autoCompleteMarca();
  }

  autoCompleteMarca() {
    this.cadastroCarroForm.controls.marca.valueChanges.pipe(
      debounceTime(500),
      switchMap(searchTerm => this.carroService.listarPorMarca(searchTerm))
    ).subscribe(result => this.carros = result);

  }

  getErrorMessage(fieldName) {
    switch (fieldName) {
      case 'marca': {
        return this.marca.hasError('required') ? 'Digite a marca' :
          this.marca.hasError('minlength') ? 'Mínimo de 3 caracteres' : '';
      } case 'modelo': {
        return this.modelo.hasError('required') ? 'Digite o modelo' : '';
      }
    }
  }

  onSubmit(){
    this.carroService.insertMarcaModelo(this.cadastroCarroForm.value)
      .subscribe(data => {
        console.log(data);
        this.requestError = null;
        this.cadastroCarroForm.reset();
        this.location.back();
      }, err => {
        if(typeof (err.error.message) == 'string') {
          this.requestError = err.error.message;
        }
        console.log(err);
      })
  }

}
