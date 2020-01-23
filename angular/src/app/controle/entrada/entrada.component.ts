import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Cliente } from 'src/app/interface/cliente';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { ClienteService } from 'src/app/service/cliente.service';
import { FichaService } from 'src/app/service/ficha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss']
})
export class EntradaComponent implements OnInit {

  veiculos = [];

  formEntrada = this.fb.group({
    osSistema: [null, Validators.required],
    osInterna: [null],
    dadosCadastrais: this.fb.group({
      cliente: ['', Validators.required],
      clienteVeiculo: ['', Validators.required]
    }),
    entrada: this.fb.group({
      dataRecepcao: [new Date(), Validators.required],
      dataPrevisaoSaida: [null],
      avariaExterior: this.fb.group({
        existente: [false],
        detalhe: [{ value: '', disabled: true }, Validators.required]
      }),
      avariaInterior: this.fb.group({
        existente: [false],
        detalhe: [{ value: '', disabled: true }, Validators.required]
      }),
      pertencesNoVeiculo: this.fb.group({
        existente: [false],
        detalhe: [{ value: '', disabled: true }, Validators.required]
      }),
      servicosPrevisao: this.fb.array([], [RxwebValidators.unique(), Validators.required])
    })
  });

  buscaCliente = new FormControl('', [Validators.required]);

  clientes = [];

  servicos = ['Cortesia', 'Ducha', 'Lavagem simples', 'Lavagem completa']
  errorForm: string;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private clienteService: ClienteService,
    private fichaService: FichaService
  ) { }

  ngOnInit() {
    this.buscaCliente.valueChanges
      .pipe(
        debounceTime(500),
        tap(search => {
          if (typeof (search) == 'undefined' || search == "") {
            this.dadosCadastrais.controls.cliente.setValue("");
            this.veiculos = [];
          }
        }),
        switchMap(search => this.clienteService.search(
          typeof (search) == 'string' ? search : '', 0, 10)
        )
      ).subscribe(result => {
        this.clientes = result.clientes;
      });

    this.avariaInterior.get('existente').valueChanges.subscribe(
      value => {
        const detalhe: FormControl = this.avariaInterior.get('detalhe') as FormControl;
        value ? detalhe.enable() : detalhe.disable();
      }
    );
    this.pertencesNoVeiculo.get('existente').valueChanges.subscribe(
      value => {
        const detalhe: FormControl = this.pertencesNoVeiculo.get('detalhe') as FormControl;
        value ? detalhe.enable() : detalhe.disable();
      }
    );
  }

  get dadosCadastrais() {
    return this.formEntrada.get('dadosCadastrais') as FormGroup;
  }

  get entrada() {
    return this.formEntrada.get('entrada') as FormGroup;
  }

  get avariaExterior() {
    return this.entrada.get('avariaExterior') as FormGroup;
  }
  
  get avariaInterior() {
    return this.entrada.get('avariaInterior') as FormGroup;
  }

  get pertencesNoVeiculo() {
    return this.entrada.get('pertencesNoVeiculo') as FormGroup;
  }

  public displayWithCliente(cliente?: Cliente): string | undefined {
    return cliente ? cliente.nome : undefined;
  }

  public setCliente(cliente?: Cliente) {
    this.dadosCadastrais.controls.cliente.setValue(cliente._id);
    this.veiculos = cliente.veiculos;
    //Se cliente possue apenas um veículo, já seleciona o mesmo
    if (this.veiculos.length == 1)
      this.dadosCadastrais.controls.clienteVeiculo.setValue(this.veiculos[0]._id);
    else
      this.dadosCadastrais.controls.clienteVeiculo.setValue("");
  }

  public setBuscaCliente() {
    if (this.dadosCadastrais.get('cliente').value.length < 1) {
      this.buscaCliente.setValue('');
      this.dadosCadastrais.get('clienteVeiculo').setValue('');
    }
  }

  onChangeServicos(event) {
    const formArray: FormArray = this.entrada.get('servicosPrevisao') as FormArray;
    if (event.checked) {
      formArray.push(new FormControl(event.source.value));
    }
    else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.source.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  public onSubmit() {
    this.fichaService.saveFichaEntrada(this.formEntrada.value)
      .subscribe(
        () => this.router.navigate(['/controle']),
        err => this._error(err)
      );
  }

  private _error(err: any): void {
    if ((err.error.message)) {
      this.errorForm = err.error.message;
    } else {
      this.errorForm = 'Ocorreu um erro desconhecido'
    }
  };

}
