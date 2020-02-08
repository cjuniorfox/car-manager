import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { FichaService } from 'src/app/service/ficha.service';
import { ServicoEnum } from 'src/app/enum/servico.enum';
import { SetorEnum } from 'src/app/enum/setor.enum';
import { BoxEnum } from 'src/app/enum/box.enum';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ficha } from 'src/app/interface/ficha';
import { Observable } from 'rxjs';
import { observablDatetime } from 'src/app/util/observableDatetime';
import { fillDateAndTimeWithDatetime } from 'src/app/util/fillDateAndTimeWithDatetime';
import { getErrorMessage } from 'src/app/util/getErrorMessage';

@Component({
  selector: 'app-servico',
  templateUrl: './ficha-servico.component.html',
  styleUrls: ['./ficha-servico.component.scss']
})
export class FichaServicoComponent implements OnInit {

  formServico = this.fb.group({
    servico: [null, Validators.required],
    setor: [null, Validators.required],
    box: [null, Validators.required],
    descricao: [null, Validators.required],
    inicio: [new Date(), Validators.required],
    fim: [new Date(new Date().setHours(new Date().getHours() + 1))]
  });

  formDataHora = this.fb.group({
    dtInicio: [null, Validators.required],
    hrInicio: ["", Validators.required],
    dtFim: [null],
    hrFim: [""]
  });

  get dataInicio() { return this.formDataHora.get('dtInicio') as FormControl };
  get horaInicio() { return this.formDataHora.get('hrInicio') as FormControl };
  get dataHoraInicio() { return this.formServico.get('inicio') as FormControl };
  get dataFim() { return this.formDataHora.get('dtFim') as FormControl };
  get horaFim() { return this.formDataHora.get('hrFim') as FormControl };
  get dataHoraFim() { return this.formServico.get('fim') as FormControl };

  errorForm: string = '';

  ficha$: Observable<Ficha>;
  fichaId: string;
  servicoId: string;

  constructor(
    private fb: FormBuilder,
    private fichaService: FichaService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  get servicos() {
    return Object.values(ServicoEnum);
  }

  get setores() {
    return Object.values(SetorEnum);
  }

  get boxes() {
    return Object.values(BoxEnum);
  }

  ngOnInit() {
    this._observableFormDataHora();
    this.route.params.subscribe(params => {
      this.fichaId = params['_id'];
      if (params['servico_id'])
        this.servicoId = params['servico_id'];
      this.ficha$ = this.fichaService.get(this.fichaId, this.servicoId);
      if (this.servicoId) {
        this._fillServico();
      } else {
        fillDateAndTimeWithDatetime(this.dataInicio, this.horaInicio, this.dataHoraInicio);
        fillDateAndTimeWithDatetime(this.dataFim, this.horaFim, this.dataHoraFim);
      }
    });
  }

  onSubmit() {
    let submit;
    if (this.servicoId)
      submit = this.fichaService.putServico(this.fichaId, this.servicoId, this.formServico.value);
    else
      submit = this.fichaService.addServico(this.fichaId, this.formServico.value);
    submit.subscribe(res => {
      this.location.back();
    }, err => {
      this.errorForm = getErrorMessage(err);
    });
  }

  private _observableFormDataHora() {
    observablDatetime(this.dataInicio, this.horaInicio, this.dataHoraInicio);
    observablDatetime(this.dataFim, this.horaFim, this.dataHoraFim);
  }

  private _fillServico() {
    this.ficha$.subscribe(ficha => {
      this.formServico.patchValue(ficha.servicos[0]);
      fillDateAndTimeWithDatetime(this.dataInicio, this.horaInicio, this.dataHoraInicio);
      fillDateAndTimeWithDatetime(this.dataFim, this.horaFim, this.dataHoraFim);
    })
  }
}
