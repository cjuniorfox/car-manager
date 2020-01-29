import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarroMarcaModelo } from 'src/app/interface/carro-marca-modelo';
import { FormControl, Validators } from '@angular/forms';
import { CarroService } from 'src/app/service/carro.service';
import { CarroModeloModel } from 'src/app/interface/carro-model';
import { handleSubmitError } from 'src/app/util/handleSubmitError';

@Component({
  selector: 'app-atualizar-carro',
  templateUrl: './atualizar-carro.component.html',
  styleUrls: ['./atualizar-carro.component.scss']
})
export class AtualizarCarroComponent implements OnInit {

  campoEdit = new FormControl('', [Validators.required]);
  labelCampoEdit = '';
  registro = '';
  requestError = '';

  constructor(
    private carroService: CarroService,
    public dialogRef: MatDialogRef<AtualizarCarroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { carroMarcaModelo: CarroMarcaModelo, operacao: string }
  ) { }

  ngOnInit() {
    switch (this.data.operacao) {
      case 'modelo': {
        this.campoEdit.setValue(this.data.carroMarcaModelo.modelo);
        this.labelCampoEdit = 'Modelo';
        this.registro = this.data.carroMarcaModelo.marca + ' - '
          + this.data.carroMarcaModelo.modelo;
        break;
      }
      case 'marca': {
        this.campoEdit.setValue(this.data.carroMarcaModelo.marca);
        this.labelCampoEdit = "Marca";
        this.registro = this.data.carroMarcaModelo.marca;
        break;
      }
    }
  }

  getErrorMessage() {
    return this.campoEdit.hasError('required') ? 'Não pode ficar vazio' : '';
  }

  onSubmit() {
    switch (this.data.operacao) {
      case 'modelo': {
        let modelo = { nome: this.campoEdit.value };
        this.carroService.updateModelo(modelo, this.data.carroMarcaModelo.modelo_id)
          .subscribe(data => {
            this.requestError = null;
            this.dialogRef.close(true);
          }, err => {
            if (typeof (err.error.message) == 'string') {
              this.requestError = err.error.message;
            }else{
              console.error(err);
              this.requestError = 'Ocorreu um erro desconhecido ao tentar atualizar o registro.';
            }
          });
        break;
      } case 'marca': {
        let marca = { marca: this.campoEdit.value };
        this.carroService.updateMarca(marca, this.data.carroMarcaModelo.marca_id)
          .subscribe(() => {
            this.requestError = null;
            this.dialogRef.close(true);
          }, err => {
            this.requestError = handleSubmitError(err);
          });
        break;
      }
    }
  }

}
