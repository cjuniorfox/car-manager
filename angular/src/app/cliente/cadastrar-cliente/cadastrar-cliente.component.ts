import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ClienteService } from 'src/app/service/cliente.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CarroService } from 'src/app/service/carro.service';
import { CarroMarcaModelo } from 'src/app/interface/carro-marca-modelo';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.scss']
})
export class CadastrarClienteComponent implements OnInit {

  cadCliForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(4)]],
    documento: this.fb.group({
      documento: [''],
      tipoDocumento: ['']
    }),
    endereco: this.fb.group({
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      cep: ['', Validators.required]
    }),
    telefones: this.fb.array([], [RxwebValidators.unique(), Validators.required]),
    veiculos: this.fb.array([], [RxwebValidators.unique(), Validators.required])
  });

  telefone = new FormControl('', Validators.required);

  veiculoForm: FormGroup = this._createNewVeiculo();

  buscaCarro = new FormControl('');

  carrosAutocomplete = new Array();

  errorForm;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private clienteService: ClienteService,
    private carroService: CarroService
  ) { }


  ngOnInit() {
    this._autoCompleteCarro();
  }

  public onSubmit() {
    this.clienteService.create(this.cadCliValues)
      .subscribe(() => {
        this.location.back();
      }, err => {
        if (typeof (err.error.message) === 'string') {
          this.errorForm = err.error.message;
        } else {
          this.errorForm = 'Não foi possível inserir cliente por um erro desconhecido'
        }
      })
  }

  get cadCliValues() {
    return this.cadCliForm.value as any;
  }

  get telefones() {
    return this.cadCliForm.get('telefones') as FormArray;
  }

  get veiculos() {
    return this.cadCliForm.get('veiculos') as FormArray;
  }

  get endereco() {
    return this.cadCliForm.get('endereco') as FormGroup;
  }

  getErrorMessage(field) {
    return field.hasError('Mask error') ?
      'Digite o valor completo.' :
      field.hasError('required') ?
        'Não pode ficar em branco.' :
        field.hasError('minLength') ?
          'Digite no mínimo' :
          '';
  }

  addTelefone() {
    //campo idependente.
    //let tel = this.fb.control(this.telefone);
    if (this.telefone.valid) {
      this.telefones.push(this.telefone);
      this.telefone = new FormControl('', Validators.required);
    }
  }

  /*   addTelefone() {
      this.telefones.push(this.fb.control(''));
    }
   */
  removeTelefone(index) {
    this.telefones.removeAt(index);
  }

  addVeiculo() {
    if (this.veiculoForm.valid) {
      this.veiculos.push(this.veiculoForm);
      this.veiculoForm = this._createNewVeiculo();
      this.buscaCarro.setValue('');
    }
  }

  removeVeiculo(index: number) {
    this.veiculos.removeAt(index);
  }

  displayCarroMarcaModelo(carro?: CarroMarcaModelo): string | undefined {
    return carro ? carro.marca + ' - ' + carro.modelo : undefined;
  }

  setCarroOnVeiculo(carro?: CarroMarcaModelo) {
    if (carro) {
      this.veiculoForm.controls.carro.setValue({ marca: carro.marca, _id: carro.marca_id });
      this.veiculoForm.controls.carroModelo.setValue({ nome: carro.modelo, _id: carro.modelo_id });
    }
  }

  toUpperCase(event) {
    event.target.value = event.target.value.toUpperCase();
  }

  mascaraTelefone(event){
    console.log(event);
    return '(00) 00000-0009'
  }

  private _autoCompleteCarro() {
    this.buscaCarro.valueChanges.pipe(
      debounceTime(500),
      switchMap(search => this.carroService.listAsTable(typeof (search) == 'string' ? search : '', 0, 10))
    ).subscribe(result => {
      this.carrosAutocomplete = result.carros;
    });
  }

  private _createNewVeiculo(): FormGroup {
    return this.fb.group({
      carro: [null, Validators.required],
      carroModelo: [null, Validators.required],
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      chassi: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }
}