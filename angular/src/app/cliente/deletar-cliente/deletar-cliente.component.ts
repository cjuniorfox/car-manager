import { Component, OnInit, Inject } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deletar-cliente',
  templateUrl: './deletar-cliente.component.html',
  styleUrls: ['./deletar-cliente.component.scss']
})
export class DeletarClienteComponent implements OnInit {
  requestError: string;

  constructor(
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onDelete() {
    this.clienteService.delete(this.data._id)
      .subscribe(() => this.dialogRef.close(true),
        err => {
          console.error(err);
          this.requestError = 'Ocorreu um erro desconhecido ao tentar deletar o registro';
        }
      )
  }

}
