import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClienteService } from '../service/cliente.service';
import { FormBuilder } from '@angular/forms';
import { tap, debounceTime, switchMap, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeletarClienteComponent } from './deletar-cliente/deletar-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import { merge } from 'rxjs';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ClienteComponent implements OnInit, AfterViewInit {

  loading: boolean = false; // Turn spinner on and off
  fieldError: string;
  clientes = new MatTableDataSource();
  colunasCliente = ['nome', 'endereco', 'telefones']
  buscarForm = this.formBuilder.group({
    buscar: ['']
  });;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._listaInicial();
    this._buscarClientesObserver()
  }

  deleteDialog(cliente) {
    const dialogRef = this.dialog.open(DeletarClienteComponent, { data: cliente });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._listaInicial();
      }
    })
  }

  private _listaInicial() {

    this.clienteService.search('', this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(res => {
        this._mapResultList(res)
      });
  }

  private _buscarClientesObserver() {
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
        this.clienteService.search(this.buscarForm.controls.buscar.value.toLowerCase(), this.paginator.pageIndex, this.paginator.pageSize)
      )
    ).subscribe(result => { this._mapResultList(result) });
  }

  _mapResultList(result: any): void {
    this.clientes.data = result.clientes;
    this.paginator.length = result.count;
    this.clientes.sort = this.sort;
    this.loading = false;
  }
}