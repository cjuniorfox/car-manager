import { Component, OnInit, ViewChild } from '@angular/core';
import { CarroService } from '../service/carro.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeletarCarroComponent } from './deletar-carro/deletar-carro.component';
import { CarroModel } from '../model/carro-model';


@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss']
})
export class CarroComponent implements OnInit {

  carrosSort = new MatTableDataSource();

  search: string;

  displayedColumns: string[] = ['marca', '_id'];

  constructor(
    private carroService: CarroService,
    public dialog: MatDialog
  ) {
    this.getCars();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    if (this.carrosSort) {
      this.carrosSort.paginator = this.paginator;
      this.carrosSort.sort = this.sort;
    }
  }

  getCars() {
    this.carroService.listar(this.search)
      .subscribe(list => {
        this.carrosSort.data = list.carros;
      });
  }
  deleteDialog(data: CarroModel) {
    const dialogRef = this.dialog.open(DeletarCarroComponent, { width: '300px', data: data });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result === true) {
        this.carroService.delete(data._id).subscribe(res => {
          console.log(res);
          this.getCars();
        });
      }
    });
  }

}
