import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FichaService } from '../service/ficha.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SearchFicha } from '../model/searchFicha.model';
import { FichaPagination } from '../interface/ficha-pagination';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ficha } from '../interface/ficha';
import { SaidaDialogComponent } from './saida-dialog/saida-dialog.component';
import { FormControl } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';
import { Servico } from '../interface/ficha-servico';
import { RegistrarRetornoDialogComponent } from './registrar-retorno-dialog/registrar-retorno-dialog.component';
import { tap, switchMap } from 'rxjs/operators';

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

  expandedElement: Ficha | null;

  fichas = new MatTableDataSource<FichaPagination>();
  loading = true;
  colunasFicha = ['osSistema','dataRecepcao', 'cliente', 'placa', 'carro', 'carroModelo', 'status'];
  colunasServico = [ 'inicio', 'servico', 'setor', 'fim','funcionario', 'actions'];

  //  sliderAtivas = new FormControl([true]);
  arrLabelSliderAtivo = ['Apenas ativas', 'Apenas finalizadas', 'Todas as fichas']
  sliderAtivo = new FormControl([0]);
  labelSliderAtivo = this.arrLabelSliderAtivo[this.sliderAtivo.value];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private fichaService: FichaService,
    public clienteService: ClienteService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //    this._sliderAtivasValuechanges();
    this._sliderAtivoValueChanges();
  }

  ngAfterViewInit() {
    this._refreshList();
    this._paginationObserver();
  }

  saidaDialog(ficha: Ficha) {
    const dialogRef = this.dialog.open(SaidaDialogComponent, { data: ficha });
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this._refreshList();
      }
    });
  }
  registrarRetornoDialog(ficha: Ficha) {
    const dialogRef = this.dialog.open(RegistrarRetornoDialogComponent, { data: ficha });
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this._refreshList();
      }
    });
  }

  deletarServicoDialog(servico: Servico) {
    const dialogRef = this.dialog.open(
      DeletarServicoDialogComponent,
      { data: servico, width: '350px' }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this._refreshList();
      }
    })
  }

  alterarSaidaDialog(ficha: Ficha) {
    const dialogRef = this.dialog.open(AlterarSaidaDialogComponent, { width: '350px' });
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.saidaDialog(ficha);
      }
    })
  }

  private _paginationObserver() {
    this.paginator.page.pipe(
      tap(() => this.loading = true),
      switchMap(() =>
        this.fichaService.listar(this._getQuery())
      )
    ).subscribe(res => { this._mapResultList(res) });
  }

  private _mapResultList(res: any) {
    this.fichas.data = res.data;
    this.paginator.length = res.count;
    this.fichas.sort = this.sort;
    this.loading = false;
  }

  private _refreshList() {
    this.loading = true;
    const getQuery = this._getQuery();
    this.fichaService.listar(getQuery).subscribe(res => { this._mapResultList(res) });
    //    this.paginator.page.subscribe(res => { this._mapResultList(res) });
  }

  private _getQuery() {
    const getQuery = new SearchFicha();
    getQuery.ativas = this.sliderAtivo.value;
    getQuery.pageIndex = this.paginator.pageIndex;
    getQuery.pageSize = this.paginator.pageSize;
    return getQuery;
  }

  private _sliderAtivoValueChanges() {
    this.sliderAtivo.valueChanges.subscribe(value => {
      this.labelSliderAtivo = this.arrLabelSliderAtivo[value];
      this._refreshList();
    });
  }
}

@Component({
  selector: 'alterar-saida-dialog',
  templateUrl: './alterar-saida-dialog.html',
})
export class AlterarSaidaDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AlterarSaidaDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'deletar-servico-dialog',
  templateUrl: './deletar-servico-dialog.html',
})
export class DeletarServicoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletarServicoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Servico) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}