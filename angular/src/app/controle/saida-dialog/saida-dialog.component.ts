import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FichaService } from 'src/app/service/ficha.service';
import { Ficha } from 'src/app/interface/ficha';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { addTimeToDate } from 'src/app/util/addTimeToDate';

@Component({
  selector: 'app-saida-dialog',
  templateUrl: './saida-dialog.component.html',
  styleUrls: ['./saida-dialog.component.scss']
})
export class SaidaDialogComponent implements OnInit {

  ficha: Ficha;

  errorForm = "";

  saidaForm = this.fb.group({
    saida: [new Date(), Validators.required]
  });

  dataHoraSaidaForm = this.fb.group({
    dataSaida : [new Date(), Validators.required],
    horaSaida : [new Date().getHours() + ':' + new Date().getMinutes(), Validators.required]
  })

  constructor(public dialogref: MatDialogRef<SaidaDialogComponent>,
    private fichaService: FichaService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Ficha) { }


  ngOnInit() {
    this.ficha = this.data;
    const saida = this.saidaForm.get('saida') as FormControl;
    const dataSaida = this.dataHoraSaidaForm.get('dataSaida') as FormControl;
    const horaSaida = this.dataHoraSaidaForm.get('horaSaida') as FormControl;
    this.dataHoraSaidaForm.valueChanges.subscribe(value=>{
      if (horaSaida.value && dataSaida.value && horaSaida.value != 'Invalid DateTime') {
        saida.setValue(addTimeToDate(horaSaida.value, dataSaida.value));
      }
    })
  }

}
