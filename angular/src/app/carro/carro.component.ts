import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CarroService } from '../service/carro.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { CarroListPaginator } from '../interface/carro-list-paginator';
import { merge } from 'rxjs';
import { CarroMarcaModelo } from '../interface/carro-marca-modelo';
import { AtualizarCarroComponent } from './atualizar-carro/atualizar-carro.component';
import { DeletarCarroComponent } from './deletar-carro/deletar-carro.component';



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
    { name: 'editMarca', label: '' },
    { name: 'marca', label: 'Marca' },
    { name: 'deleteModelo', label: '' },
    { name: 'editModelo', label: '' },
    { name: 'modelo', label: 'Modelo' },
  ];
  displayedColumns: String[] = this.initColumns.map(col => col.name);

  loading: boolean = true; // Turn spinner on and off

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private carroService: CarroService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
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

  public updateDialog(carroMarcaModelo: CarroMarcaModelo, operacao: string) {
    const data = { carroMarcaModelo: carroMarcaModelo, operacao: operacao }
    const dialogRef = this.dialog.open(AtualizarCarroComponent, { data: data });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._listaInicial();
      }
    });
  }

  public deleteDialog(carroMarcaModelo: CarroMarcaModelo) {
    const dialogRef = this.dialog.open(DeletarCarroComponent, { data: carroMarcaModelo });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._listaInicial();
      }
    })
  }

  private _buscarCarros() {
    merge(this.buscarForm.controls.buscar.valueChanges, this.paginator.page).pipe(
      tap(() => this.loading = true),
      debounceTime(500),
      tap(res => {
        //Se busca alterada, reinicia paginação
        if (typeof (res) === 'string') {
          this.paginator.pageIndex = 0;
        }
      }),
      switchMap(() =>
        this.carroService.listAsTable(this.buscarForm.controls.buscar.value.toLowerCase(), this.paginator.pageIndex, this.paginator.pageSize)
      )
    ).subscribe(result => { this._subscribeCarro(result) }
    );
  }

  private _listaInicial() {
    this.carroService.listAsTable(this.buscarForm.controls.buscar.value.toLowerCase(), this.paginator.pageIndex, this.paginator.pageSize).pipe(
      tap(() => this.loading = true)
    ).subscribe(result => this._subscribeCarro(result))
  }

  private _subscribeCarro(result: CarroListPaginator) {
    this.carros.data = result.carros;
    this.paginator.length = result.count;
    //    this.carros.paginator = this.paginator;
    this.carros.sort = this.sort;
    this.loading = false
  }
}
