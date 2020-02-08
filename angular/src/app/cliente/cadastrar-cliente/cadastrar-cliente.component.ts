import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ClienteService } from 'src/app/service/cliente.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { debounceTime, switchMap, filter, map } from 'rxjs/operators';
import { CarroService } from 'src/app/service/carro.service';
import { CarroMarcaModelo } from 'src/app/interface/carro-marca-modelo';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interface/cliente';
import { of } from 'rxjs';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.scss']
})
export class CadastrarClienteComponent implements OnInit {

  sub: any;

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

  veiculoForm: FormGroup = this._formGroupVeiculo();

  buscaCarro = new FormControl('');

  carrosAutocomplete = new Array();

  errorForm;
  cliente_idUpdate: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private clienteService: ClienteService,
    private carroService: CarroService
  ) { }


  ngOnInit() {
    this._autoCompleteCarro();
    this._getCliente(); //Em caso de update.
  }

  public onSubmit() {
    //Se update, atualiza registro
    if (this.cliente_idUpdate) {
      this.clienteService.put(this.cliente_idUpdate, this.cadCliValues)
        .subscribe(() => {
          this.location.back();
        }, err => this._error(err))
      return;
    }
    //Senão, grava novo registro
    this.clienteService.create(this.cadCliValues)
      .subscribe(() => {
        this.location.back();
      }, err => this._error(err))
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
      this.veiculoForm = this._formGroupVeiculo();
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

  mascaraTelefone(event) {
    return '(00) 00000-0009'
  }

  private _getCliente() {
    this.route.params.pipe(
      map(params => {
        if (params['id']) {
          this.cliente_idUpdate = params['id'];
          return params['id'];
        } else
          return false;
      }),
      filter(idCliente => idCliente != false),
      switchMap(idCliente => this.clienteService.get(idCliente))
    ).subscribe(cliente => {
      this.cadCliForm.patchValue(cliente);
      cliente.telefones.map(telefone =>
        this.telefones.push(new FormControl(telefone, Validators.required)));
      cliente.veiculos.map(veiculo =>
        this.veiculos.push(this._formGroupVeiculo(veiculo)));
    });
    /* this.route.params.subscribe(params => {
      if (!params['id']) {
        return; //Se não exisitir parametro, sai fora
      }
      this.cliente_idUpdate = params['id'];
      this.clienteService.get(this.cliente_idUpdate).subscribe(data => this._mapCliente(data),
        err => this._error(err)
      )
    }); */
  }
  _mapCliente(data: Cliente) {
    //    this.cadCliForm.get('nome').setValue(data.nome);
    //    this.cadCliForm.get('endereco').get('endereco').setValue(data.endereco.endereco);
    //    this.cadCliForm.get('endereco').get('cidade').setValue(data.endereco.cidade);
    //    this.cadCliForm.get('endereco').get('cep').setValue(data.endereco.cep);
    if (data.telefones)
      data.telefones.map(telefone =>
        this.telefones.push(new FormControl(telefone, Validators.required))
      );
    if (data.veiculos)
      data.veiculos.map(veiculo =>
        this.veiculos.push(this._formGroupVeiculo(veiculo)))
    //    this.cadCliForm.get('telefones').setValue(data.telefones);
    //    this.cadCliForm.get('endereco').get('endereco').setValue(data.endereco.endereco);
  }

  private _autoCompleteCarro() {
    this.buscaCarro.valueChanges.pipe(
      debounceTime(500),
      switchMap(search => this.carroService.listAsTable(
        typeof (search) == 'string' ? search : '', 0, 10)
      )
    ).subscribe(result => {
      this.carrosAutocomplete = result.carros;
    });
  }

  private _formGroupVeiculo(veiculo = null): FormGroup {
    const _id = veiculo ? veiculo._id : null;
    const carro = veiculo ? veiculo.carro : null;
    const carroModelo = veiculo ? veiculo.carroModelo : null;
    const placa = veiculo ? veiculo.placa : '';
    const chassi = veiculo ? veiculo.chassi : '';
    let formVeiculo = {
      _id: [_id],
      carro: [carro, Validators.required],
      carroModelo: [carroModelo, Validators.required],
      placa: [placa, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      chassi: [chassi, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    };
    if (_id == null) {
      delete formVeiculo._id;
    }
    return this.fb.group(formVeiculo);
  }
  private _error(err: any): void {
    if ((err.error.error.message)) {
      this.errorForm = err.error.error.message;
    } else {
      this.errorForm = 'Ocorreu um erro desconhecido'
    }
  };
}
