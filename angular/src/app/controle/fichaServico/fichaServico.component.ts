import { Component, OnInit, Inject } from '@angular/core';
import { Ficha } from 'src/app/interface/ficha';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FichaService } from 'src/app/service/ficha.service';
import { handleSubmitError } from 'src/app/util/handleSubmitError';
import { ServicoEnum } from 'src/app/enum/servico.enum';
import { SetorEnum } from 'src/app/enum/setor.enum';
import { BoxEnum } from 'src/app/enum/box.enum';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { addTimeToDate } from 'src/app/util/addTimeToDate';

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
    fim: [null, Validators.required]
  });

  timeFields = this.fb.group({
    inicio: [null, Validators.required],
    fim: [null, Validators.required]
  })

  requestError: string = '';

  constructor(
    private fb: FormBuilder,
    private fichaService: FichaService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.timeFields.valueChanges.subscribe(val => {
      if (this.formServico.get('inicio').valid && val.inicio != 'Invalid DateTime'){
        const dataInicio = this.formServico.get('inicio');
        dataInicio.setValue(addTimeToDate(val.inicio,dataInicio.value));
      }
      if (this.formServico.get('fim').valid && val.fim != 'Invalid DateTime'){
        const dataFim = this.formServico.get('fim');
        dataFim.setValue(addTimeToDate(val.fim,dataFim.value))
      }
    });
  }

  get servicos() {
    return Object.values(ServicoEnum);
  }

  get setores() {
    return Object.values(SetorEnum);
  }

  get boxes() {
    return Object.values(BoxEnum);
  }

  onSubmit() {
    this.fichaService.addServico(this.route.params['_id'], this.formServico.value).subscribe(res => {
      this.location.back();
    }, err => {
      this.requestError = handleSubmitError(err);
    });
  }

}
