import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ficha } from 'src/app/interface/ficha';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { addTimeToDate } from 'src/app/util/addTimeToDate';
import { getErrorMessage } from 'src/app/util/getErrorMessage';
import { FichaService } from 'src/app/service/ficha.service';

@Component({
  selector: 'app-registrar-retorno-dialog',
  templateUrl: './registrar-retorno-dialog.component.html',
  styleUrls: ['./registrar-retorno-dialog.component.scss']
})
export class RegistrarRetornoDialogComponent implements OnInit {

  ficha: Ficha;

  errorForm = "";

  retornoForm = this.fb.group({
    data: [new Date(), Validators.required]
  });

  dataHoraRetornoForm = this.fb.group({
    data: [new Date(), Validators.required],
    hora: [new Date().getHours() + ':' + new Date().getMinutes(), Validators.required]
  })


  constructor(
    public dialogRef: MatDialogRef<RegistrarRetornoDialogComponent>,
    private fichaService: FichaService,
    @Inject(MAT_DIALOG_DATA) public data: Ficha,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.ficha = this.data;
    const dataHora = this.retornoForm.get('data') as FormControl;
    const data = this.dataHoraRetornoForm.get('data') as FormControl;
    const hora = this.dataHoraRetornoForm.get('hora') as FormControl;
    this.dataHoraRetornoForm.valueChanges.subscribe(value => {
      if (hora.value && data.value && hora.value != 'Invalid DateTime') {
        dataHora.setValue(addTimeToDate(hora.value, data.value));
      }
    })
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.fichaService.finalizar(this.ficha._id, this.dataHoraRetornoForm.get('saida').value)
    .subscribe(()=>{
      this.dialogRef.close(true)
    },err=>{
      this.errorForm = getErrorMessage(err);
    });
  }

}
