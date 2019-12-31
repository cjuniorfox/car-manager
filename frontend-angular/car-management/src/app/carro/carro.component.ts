import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CarroService } from '../service/carro.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeletarCarroComponent } from './deletar-carro/deletar-carro.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { CarroListPaginator } from '../interface/carro-list-paginator';
import { merge } from 'rxjs';


@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CarroComponent implements OnInit, AfterViewInit {

  carros = new MatTableDataSource();
  buscarForm: FormGroup;

  initColumns: any[] = [
    { name: 'marca', label: 'Marca' },
    { name: 'modelo', label: 'Modelo' },
    { name: 'id_marca', label: 'Id da marca' },
  ];
  displayedColumns: String[] = this.initColumns.map(col => col.name);

  loading: boolean = true; // Turn spinner on and off

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private carroService: CarroService,
    private formBuilder: FormBuilder
  ) {
    this.buscarForm = this.formBuilder.group({
      buscar: ['']
    });
  };

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._listaInicial();
    this._buscarCarros();
  }


  private _buscarCarros() {
    merge(this.buscarForm.controls.buscar.valueChanges, this.paginator.page).pipe(
      debounceTime(500),
      tap(() => this.loading = true),
      switchMap(() =>
        this.carroService.listPaginator(this.buscarForm.controls.buscar.value.toLowerCase(), this.paginator.pageIndex, this.paginator.pageSize)
      )
    ).subscribe(result => { this._subscribeCarro(result) }
    );
  }

  private _subscribeCarro(result: CarroListPaginator) {
    this.carros.data = result.carros;
    this.paginator.length = result.count;
    //    this.carros.paginator = this.paginator;
    this.carros.sort = this.sort;
    this.loading = false
  }

  private _listaInicial() {
    this.carroService.listPaginator('', this.paginator.pageIndex, this.paginator.pageSize).pipe(
      tap(_ => this.loading = true)
    ).subscribe(result => this._subscribeCarro(result))
  }




  // 
  // search: string;

  // displayedColumns: string[] = ['marca', '_id'];
  // expandedElement: CarroModel | null;

  // constructor(
  //   private carroService: CarroService,
  //   public dialog: MatDialog
  // ) {
  //   this.getCars();
  // }




  // ngOnInit() {
  //   if (this.carrosSort) {
  //     this.carrosSort.paginator = this.paginator;
  //     this.carrosSort.sort = this.sort;
  //   }
  // }


  // deleteDialog(data: CarroModel) {
  //   const dialogRef = this.dialog.open(DeletarCarroComponent, { width: '300px', data: data });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result && result === true) {
  //       this.carroService.delete(data._id).subscribe(res => {
  //         console.log(res);
  //         this.getCars();
  //       });
  //     }
  //   });
  // }

}
