import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { FichaService } from 'src/app/service/ficha.service';
import { handleSubmitError } from 'src/app/util/handleSubmitError';
import { ServicoEnum } from 'src/app/enum/servico.enum';
import { SetorEnum } from 'src/app/enum/setor.enum';
import { BoxEnum } from 'src/app/enum/box.enum';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { addTimeToDate } from 'src/app/util/addTimeToDate';
import { Ficha } from 'src/app/interface/ficha';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servico',
  templateUrl: './fichaServico.component.html',
  styleUrls: ['./fichaServico.component.scss']
})
export class FichaServicoComponent implements OnInit {

  formServico = this.fb.group({
    servico: [null, Validators.required],
    setor: [null, Validators.required],
    box: [null, Validators.required],
    descricao: [null, Validators.required],
    inicio: [null, Validators.required],
    fim: [null]
  });

  formDataHora = this.fb.group({
    hrInicio: [null, Validators.required],
    dtInicio: [null, Validators.required],
    hrFim: [null],
    dtFim: [null]
  })

  requestError: string = '';

  ficha$: Observable<Ficha>;
  fichaId: string;

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
      this.ficha$ = this.fichaService.get(this.fichaId);
    });
  }

  onSubmit() {
      this.fichaService.addServico(this.fichaId, this.formServico.value).subscribe(res => {
        this.location.back();
      }, err => {
        this.requestError = handleSubmitError(err);
      });
  }


  private _observableFormDataHora() {
    this.formDataHora.valueChanges.subscribe(val => {
      this._preencherHoraInicio(val.hrInicio, val.dtInicio);
      this._preencherHoraFim(val.hrFim, val.dtFim);
    });
  }

  private _preencherHoraInicio(hrInicio: string, dtInicio: Date) {
    if (hrInicio && dtInicio && hrInicio != 'Invalid DateTime') {
      const dataInicio = this.formServico.get('inicio');
      dataInicio.setValue(addTimeToDate(hrInicio, dtInicio));
    }
  }

  private _preencherHoraFim(hrFim: string, dtFim: Date) {
    if (hrFim && dtFim && hrFim != 'Invalid DateTime') {
      const dataFim = this.formServico.get('fim');
      dataFim.setValue(addTimeToDate(hrFim, dtFim));
    }
  }

}
