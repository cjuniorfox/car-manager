import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioGerencialComponent } from './relatorio-gerencial.component';
import { UserGuard } from '../guards/user.guard';


const routes: Routes = [
  {
    path: '',
    component: RelatorioGerencialComponent,
    canActivate: [UserGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioGerencialRoutingModule { }