import { Component, OnInit, ViewChild } from '@angular/core';
import { CarroService } from '../service/carro.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeletarCarroComponent } from './deletar-carro/deletar-carro.component';
import { CarroModel } from '../model/carro-model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap, startWith, tap } from 'rxjs/operators';


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
export class CarroComponent implements OnInit {

  carrosSort = new MatTableDataSource();
  buscarForm: FormGroup;

  initColumns: any[] = [
    { name: 'marca', label: 'Marca' },
    { name: 'modelo', label: 'Modelo' },
    { name: 'id_marca', label: 'Id da marca' },
  ];
  displayedColumns: String[] = this.initColumns.map(col => col.name);

  loading: boolean = true; // Turn spinner on and off

  constructor(
    private carroService: CarroService,
    private formBuilder: FormBuilder
  ) {
    this.buscarForm = this.formBuilder.group({
      buscar: ['']
    });
  };



  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;

  ngOnInit() {
    this._buscarCarros();
    this._listaInicial();
  }

  private _buscarCarros() {
    this.buscarForm.controls.buscar.valueChanges.pipe(
      debounceTime(500),
      tap(_ => this.loading = true),
      switchMap(searchTerm => this.carroService.listar(searchTerm.toLowerCase()))
    ).subscribe(result => this._subscribeCarro(result)
    );
  }

  private _subscribeCarro(result) {
    this.carrosSort.data = this.carroService.convertToMarcaModeloList(result);
//    this.carrosSort.paginator = this.paginator;
    this.carrosSort.sort = this.sort;
    this.loading = false
  }

  private _listaInicial() {
    this.carroService.listar('').pipe(
      tap(_ => this.loading = true)
    ).subscribe(result => this._subscribeCarro(result))
  }


  @ViewChild(MatSort, { static: true }) sort: MatSort;
//  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
