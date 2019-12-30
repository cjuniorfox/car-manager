import { Component, OnInit } from '@angular/core';
import { CarroModel } from 'src/app/model/carro-model';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { CarroService } from 'src/app/service/carro.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-carro-cadastro',
  templateUrl: './carro-cadastro.component.html',
  styleUrls: ['./carro-cadastro.component.scss']
})
export class CarroCadastroComponent implements OnInit {

  //teste
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  carroEdit: CarroModel;

  carForm;

  requestError;

  //Este é preenchido com marca-modelo quando escolhida opção de editar.
  paramMarcaModelo;

  marca = new FormControl('', [Validators.required, Validators.minLength(3)]);
  modelo = new FormControl('', [Validators.required]);
  observableCarros: Observable<CarroModel[]>;
  carros: Array<CarroModel> = new Array<CarroModel>();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private carroService: CarroService,
    private location: Location
  ) {
    this.carForm = new FormBuilder().group({
      marca: this.marca,
      modelo: this.modelo
    })
  }

  ngOnInit() {
    this.filteredOptions = this.marca.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    //Quando preenchendo marca
    // this.observableCarros = this.marca.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
    //Quando editando registro
    this.route.params.subscribe(params => {
      this.paramMarcaModelo = params['marca-modelo'];
      if (this.paramMarcaModelo) {
        this.carroService.getMarcaModelo(this.paramMarcaModelo).subscribe(data => {
          this.carroEdit = data;
        });
      }
    });
  }
  // private  _filter(value: string): CarroModel[] {
  //   this.carroService.listarPorMarca(value).subscribe(res =>{
  //     this.carros = res;
  //   });
  //   return this.carros;
  // }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(formData) {
    if (this.carroEdit && this.carroEdit._id) {
      this.patch(formData);
    } else {
      this.insert(formData);
    }
  }

  patch(formData) {
    this.carroService.patch(formData, this.carroEdit._id).subscribe(data => {
      this.requestError = null;
      this.location.back();
    }, err => {
      if (typeof (err.error.message) == 'string') {
        this.requestError = err.error.message;
      }
    })
  }

  insert(formData) {
    this.carroService.insert(formData).subscribe(data => {
      this.requestError = null;
      this.carForm.reset();
      this.location.back();
    }, err => {
      if (typeof (err.error.message) == 'string') {
        this.requestError = err.error.message;
      }
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
