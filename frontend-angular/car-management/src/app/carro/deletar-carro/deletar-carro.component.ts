import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarroModel } from 'src/app/model/carro-model';

@Component({
  selector: 'app-deletar-carro',
  templateUrl: './deletar-carro.component.html',
  styleUrls: ['./deletar-carro.component.scss']
})
export class DeletarCarroComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletarCarroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarroModel) { }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
