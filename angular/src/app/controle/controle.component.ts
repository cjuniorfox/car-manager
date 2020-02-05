import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FichaService } from '../service/ficha.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SearchFicha } from '../model/searchFicha.model';
import { FichaPagination } from '../interface/ficha-pagination';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClienteService } from '../service/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { Ficha } from '../interface/ficha';
import { SaidaDialogComponent } from './saida-dialog/saida-dialog.component';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ControleComponent implements OnInit, AfterViewInit {

  fichas = new MatTableDataSource<FichaPagination>();
  loading = true;
  colunasFicha = ['osInterna', 'osSistema', 'cliente', 'placa', 'carro', 'carroModelo'];
  colunasServico = ['funcionario', 'inicio', 'servico', 'setor', 'fim'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private fichaService: FichaService,
    private clienteService: ClienteService,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this._refreshList()
  }

  saidaDialog(ficha: Ficha) {
    const dialogRef = this.dialog.open(SaidaDialogComponent, { data: ficha });
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this._refreshList();
      }
    })
  }

  private _mapResultList(res: any) {
    this.fichas.data = res.data;
    this.paginator.length = res.count;
    this.fichas.sort = this.sort;
    this.loading = false;
  }

  private _refreshList() {
    const getQuery = new SearchFicha();
    getQuery.pageIndex = this.paginator.pageIndex;
    getQuery.pageSize = this.paginator.pageSize;
    this.fichaService.listar(getQuery).subscribe(res => { this._mapResultList(res) });
    this.paginator.page.subscribe(res => { this._mapResultList(res) });
  }
}
