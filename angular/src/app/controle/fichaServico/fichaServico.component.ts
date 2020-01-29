import { Component, OnInit, Inject } from '@angular/core';
import { Ficha } from 'src/app/interface/ficha';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FichaService } from 'src/app/service/ficha.service';
import { handleSubmitError } from 'src/app/util/handleSubmitError';
import { ServicoEnum } from 'src/app/enum/servico.enum';
import { SetorEnum } from 'src/app/enum/setor.enum';
import { BoxEnum } from 'src/app/enum/box.enum';

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

  dateTimes = this.fb.group({
    dtInicio: [null, Validators.required],
    hrInicio: [null, Validators.required],
    dtFim: [null, Validators.required],
    hrFim: [null, Validators.required]
  })

  requestError: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Ficha,
    private fb: FormBuilder,
    private fichaService: FichaService,
    private dialogRef: MatDialogRef<FichaServicoComponent>
  ) { }

  ngOnInit() {
    this.dateTimes.valueChanges.subscribe(val => {
      let dtInicio : string = '2020-01-07T03:00:00.000Z';
      console.log(dtInicio.substring(11,16))
      if (val.dtInicio && val.hrInicio != 'Invalid Time')
        this.formServico.get('inicio').setValue(val.dtInicio.replace(val.dtInicio.substring(11, 16), val.hrInicio));
      
    })
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
    this.fichaService.addServico(this.data._id, this.formServico.value).subscribe(res => {
      this.requestError = null;
      this.dialogRef.close(true);
    }, err => {
      this.requestError = handleSubmitError(err);
    });
  }

}
