import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { Cliente, ClienteVeiculo } from 'src/app/interface/cliente';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { ClienteService } from 'src/app/service/cliente.service';
import { FichaService } from 'src/app/service/ficha.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoEnum } from 'src/app/enum/servico.enum';
import { of } from 'rxjs';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss']
})
export class EntradaComponent implements OnInit {

  veiculos = [];



  buscaCliente = new FormControl('', [Validators.required]);

  clientes = [];

  servicos = this._defineServicos();

  errorForm: string;
  fichaId: string;

  constructor(
    private location: Location,
    private router: Router,
    private clienteService: ClienteService,
    private fichaService: FichaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._getFicha(); //Em caso de update
    this._observableClienteAutoComplete();
    this._observableAvariasEPertences();
  }

  get fichaForm() {
    return this.fichaService.fichaForm as FormGroup;
  }

  get dadosCadastrais() {
    return this.fichaForm.get('dadosCadastrais') as FormGroup;
  }

  get entrada() {
    return this.fichaForm.get('entrada') as FormGroup;
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
    this.dadosCadastrais.get('cliente').setValue(cliente._id);
    this.veiculos = cliente.veiculos;
    //Se cliente possuir apenas um veículo, já seleciona o mesmo
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
    this.fichaService.saveFichaEntrada(this.fichaForm.value)
      .subscribe(
        () => this.router.navigate(['/controle']),
        err => this._error(err)
      );
  }

  private _getFicha() {
    this.activatedRoute.params.pipe(
      switchMap(params => {
        if (params['_id']) {
          this.fichaId = params['_id'];
          return of(this.fichaId);
        } else
          return null;
      }),
      switchMap(fichaId => this.fichaService.get(fichaId))
    ).subscribe(ficha => {
      this.fichaForm.patchValue(ficha);
      const servicosPrevisao = this.entrada.get('servicosPrevisao') as FormArray;
      const cliente = ficha.dadosCadastrais.cliente;
      const clienteVeiculo = ficha.dadosCadastrais.clienteVeiculo;
      this.buscaCliente.setValue(cliente)
      this._setClienteVeiculo(cliente, clienteVeiculo);
      ficha.entrada.servicosPrevisao.map(servico =>
        servicosPrevisao.push(new FormControl(servico))
      );
      this.servicos = this._defineServicos();
    });
  }

  private _setClienteVeiculo(cliente: Cliente, clienteVeiculo: ClienteVeiculo) {
    const dadosCadastrais = this.fichaForm.get('dadosCadastrais') as FormGroup;
    this.setCliente(cliente);
    dadosCadastrais.get('cliente').setValue(cliente._id);
    dadosCadastrais.get('clienteVeiculo').setValue(clienteVeiculo._id);
  }

  private _error(err: any): void {
    if ((err.error.message)) {
      this.errorForm = err.error.message;
    } else {
      this.errorForm = 'Ocorreu um erro desconhecido'
    }
  };

  private _observableClienteAutoComplete() {
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
  }

  private _observableAvariasEPertences() {
    this.avariaInterior.get('existente').valueChanges.subscribe(
      value => {
        const detalhe: FormControl = this.avariaInterior.get('detalhe') as FormControl;
        value ? detalhe.enable() : detalhe.disable();
      }
    );
    this.avariaExterior.get('existente').valueChanges.subscribe(
      value => {
        const detalhe: FormControl = this.avariaExterior.get('detalhe') as FormControl;
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

  private _defineServicos(): Array<{ name: string, checked: boolean }> {
    return Object.values(ServicoEnum).map(servico => ({
      name: servico,
      checked: (this.entrada.get('servicosPrevisao').value.includes(servico))
    })
    );
  }

}
