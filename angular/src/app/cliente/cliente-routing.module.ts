import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserGuard } from '../guards/user.guard';
import { ClienteComponent } from './cliente.component';
import { CadastrarClienteComponent } from './cadastrar-cliente/cadastrar-cliente.component';


const routes: Routes = [
  { path: '',component: ClienteComponent,canActivate: [UserGuard] },
  { path: "cadastrar", component: CadastrarClienteComponent, canActivate: [UserGuard] },
  { path: ":id", component: CadastrarClienteComponent, canActivate: [UserGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }