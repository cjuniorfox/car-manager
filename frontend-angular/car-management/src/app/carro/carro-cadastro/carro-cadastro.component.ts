import { Component, OnInit } from '@angular/core';
import { CarroModel } from 'src/app/model/carro-model';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { CarroService } from 'src/app/service/carro.service';

@Component({
  selector: 'app-carro-cadastro',
  templateUrl: './carro-cadastro.component.html',
  styleUrls: ['./carro-cadastro.component.scss']
})
export class CarroCadastroComponent {

  car = new CarroModel();

  carForm;

  requestError;

  marca = new FormControl('', [Validators.required, Validators.minLength(3)]);
  modelo = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private carroService: CarroService
    ) {
    this.carForm = new FormBuilder().group({
      marca: this.marca,
      modelo: this.modelo
    })
  }

  onSubmit(formData) {
    this.carroService.cadastrar(formData).subscribe( data => {
      this.requestError = null;
      console.log(data);
      this.carForm.reset();
    }, err => {
      this.requestError = err.error.message;
      console.error("ERRO",err.error.message);
    });

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

}
