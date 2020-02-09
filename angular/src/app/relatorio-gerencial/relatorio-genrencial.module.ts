import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioGerencialRoutingModule } from './relatorio-gerencial-routing.module';
import { RelatorioGerencialComponent } from './relatorio-gerencial.component';

@NgModule({
  imports: [
    CommonModule,
    RelatorioGerencialRoutingModule
  ],
  declarations: [RelatorioGerencialComponent]
})
export class RelatorioGerencialModule { }