import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../service/veiculo.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { CarModel } from '../model/car-model';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.scss']
})
export class VeiculoComponent implements OnInit {

  car = new CarModel();

  carForm;

  marca = new FormControl('', [Validators.required, Validators.minLength(3)]);
  modelo = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) {
    this.carForm = new FormBuilder().group({
      marca: this.marca,
      modelo: this.modelo
    })
  }

  onSubmit(formData) {
    console.warn('Formulário enviado', formData);
    this.carForm.reset();
  }

  getErrorMessage() {
    return this.marca.hasError('required') ? 'Digite a marca' :
      this.marca.hasError('minlength') ? 'Mínimo de 3 caracteres' :
        this.modelo.hasError('required') ? 'Digite o modelo' :
          '';



  }

  ngOnInit() {
  }

}
