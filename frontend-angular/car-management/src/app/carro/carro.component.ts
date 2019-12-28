import { Component, OnInit, ViewChild } from '@angular/core';
import { CarroService } from '../service/carro.service';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss']
})
export class CarroComponent implements OnInit {

  carrosSort = new MatTableDataSource();

  search:string;

  displayedColumns: string[] = ['marca', 'modelo','_id'];

  constructor(
    private carroService: CarroService
  ) {
    this.getCars();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  ngOnInit() {
    if(this.carrosSort){
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



}
