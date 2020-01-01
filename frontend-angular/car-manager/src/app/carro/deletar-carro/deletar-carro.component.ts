import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarroModel } from 'src/app/interface/carro-model';
import { CarroService } from 'src/app/service/carro.service';
import { CarroMarcaModelo } from 'src/app/interface/carro-marca-modelo';

@Component({
  selector: 'app-deletar-carro',
  templateUrl: './deletar-carro.component.html',
  styleUrls: ['./deletar-carro.component.scss']
})
export class DeletarCarroComponent implements OnInit {
  requestError: string;

  constructor(
    private carroService: CarroService,
    public dialogRef: MatDialogRef<DeletarCarroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarroMarcaModelo) { }


  ngOnInit() {
  }

  onDelete(): void {
    this.carroService.deleteModelo(this.data.modelo_id)
    .subscribe(()=>{
      this.dialogRef.close(true);
    },err => {
      console.error(err);
      this.requestError = 'Ocorreu um erro desconhecido ao tentar atualizar o registro';
    })
  }

}
