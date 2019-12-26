import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarroModel } from '../model/carro-model';
import { CarroService } from '../service/carro.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss']
})
export class CarroComponent implements OnInit {

  car = new CarroModel();

  carForm;

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
      console.log(data);
    }, err => {
      console.error(err);
    });
  //  console.warn('Formulário enviado', formData);
    this.carForm.reset();
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

  ngOnInit() {
  }

}
