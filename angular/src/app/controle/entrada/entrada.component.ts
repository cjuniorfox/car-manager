import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Cliente, ClienteVeiculo } from 'src/app/interface/cliente';
import { debounceTime, switchMap, tap, finalize, map, filter } from 'rxjs/operators';
import { ClienteService } from 'src/app/service/cliente.service';
import { FichaService } from 'src/app/service/ficha.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoEnum } from 'src/app/enum/servico.enum';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { getErrorMessage } from 'src/app/util/getErrorMessage';
import { observablDatetime } from 'src/app/util/observableDatetime';
import { fillDateAndTimeWithDatetime } from 'src/app/util/fillDateAndTimeWithDatetime';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss']
})
export class EntradaComponent implements OnInit {

  veiculos = [];

  fichaForm = this.fb.group({
    osSistema: [null, Validators.required],
    osInterna: [null],
    dadosCadastrais: this.fb.group({
      cliente: ['', Validators.required],
      clienteVeiculo: ['', Validators.required]
    }),
    entrada: this.fb.group({
      dataRecepcao: [new Date(), Validators.required],
      dataPrevisaoSaida: [''],
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

  dataHoraRecepcao = this.fb.group({
    dataRecepcao: [new Date(), Validators.required],
    horaRecepcao: [new Date().getHours() + ':' + new Date().getMinutes(), Validators.required]
  })
  dataHoraPrevisaoSaida = this.fb.group({
    dataPrevisaoSaida: [''],
    horaPrevisaoSaida: ['']
  })

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
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this._getFicha(); //Em caso de update
    this._observableDataHora();
    this._observableClienteAutoComplete();
    this._observableAvariasEPertences();
  }

  get dadosCadastrais() { return this.fichaForm.get('dadosCadastrais') as FormGroup }
  get entrada() { return this.fichaForm.get('entrada') as FormGroup }
  get avariaExterior() { return this.entrada.get('avariaExterior') as FormGroup }
  get avariaInterior() { return this.entrada.get('avariaInterior') as FormGroup }
  get pertencesNoVeiculo() { return this.entrada.get('pertencesNoVeiculo') as FormGroup }
  get dataRecepcao() { return this.dataHoraRecepcao.get('dataRecepcao') as FormControl };
  get horaRecepcao() { return this.dataHoraRecepcao.get('horaRecepcao') as FormControl };
  get datahoraRecepcaoField() { return this.fichaForm.get('entrada').get('dataRecepcao') as FormControl };
  get dataPrevisaoSaida() { return this.dataHoraPrevisaoSaida.get('dataPrevisaoSaida') as FormControl };
  get horaPrevisaoSaida() { return this.dataHoraPrevisaoSaida.get('horaPrevisaoSaida') as FormControl };
  get dataHoraPrevisaoSaidaField() { return this.fichaForm.get('entrada').get('dataPrevisaoSaida') as FormControl };

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
    //Se fichaId, significa que transação se trata de um update.
    if (this.fichaId) {
      this.fichaService.put(this.fichaId, this.fichaForm.value)
        .subscribe(
          () => this.router.navigate(['/controle']),
          err => getErrorMessage(err)
        );
    } else {
      this.fichaService.saveFichaEntrada(this.fichaForm.value)
        .subscribe(
          () => this.router.navigate(['/controle']),
          err => {this.errorForm = getErrorMessage(err)}
        );
    }
  }

  private _getFicha() {
    this.activatedRoute.params.pipe(
      map(params => {
        if (params['_id']) {
          this.fichaId = params['_id'];
          return this.fichaId;
        }
        return false;
      }),
      filter(fichaId => fichaId != false),
      switchMap(fichaId => this.fichaService.get(fichaId, null))
    ).subscribe(ficha => {
      this.fichaForm.patchValue(ficha);
      const servicosPrevisao = this.entrada.get('servicosPrevisao') as FormArray;
      const cliente = ficha.dadosCadastrais.cliente;
      const clienteVeiculo = ficha.dadosCadastrais.clienteVeiculo;
      this.buscaCliente.setValue(cliente)
      this._setClienteVeiculo(cliente, clienteVeiculo);
      fillDateAndTimeWithDatetime(this.dataRecepcao, this.horaRecepcao, this.datahoraRecepcaoField);
      fillDateAndTimeWithDatetime(this.dataPrevisaoSaida, this.horaPrevisaoSaida, this.dataHoraPrevisaoSaidaField);
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
    }));
  }

  private _observableDataHora() {
    observablDatetime(this.dataRecepcao, this.horaRecepcao, this.datahoraRecepcaoField);
    observablDatetime(this.dataPrevisaoSaida, this.horaPrevisaoSaida, this.dataHoraPrevisaoSaidaField);
  }

  /* private _preencherHoraInicio(hrInicio: string, dtInicio: Date) {
    if (hrInicio && dtInicio && hrInicio != 'Invalid DateTime') {
      const dataInicio = this.formServico.get('inicio');
      dataInicio.setValue(addTimeToDate(hrInicio, dtInicio));
    }
  }

  private _preencherHoraFim(hrFim: string, dtFim: Date) {
    if (hrFim && dtFim && hrFim != 'Invalid DateTime') {
      const dataFim = this.formServico.get('fim');
      dataFim.Value(addTimeToDate(hrFim, dtFim));
    }
  } */

}
