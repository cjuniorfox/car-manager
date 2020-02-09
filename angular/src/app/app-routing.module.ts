//import { RelatorioGerencialComponent } from './relatorio-gerencial/relatorio-gerencial.component';
//import { LoginComponent } from './user/login/login.component';
//import { LoginGuard } from './guards/login.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { ControleComponent } from './controle/controle.component';
//import { EntradaComponent } from './controle/entrada/entrada.component';
//import { OpcaoComponent } from './opcao/opcao.component';
//import { UsuarioComponent } from './opcao/usuario/usuario.component';
//import { PermissaoComponent } from './opcao/permissao/permissao.component';
//import { ClienteComponent } from './cliente/cliente.component';
//import { CadastrarClienteComponent } from './cliente/cadastrar-cliente/cadastrar-cliente.component';
//import { CarroComponent } from './carro/carro.component';
//import { CadastrarCarroComponent } from './carro/cadastrar-carro/cadastrar-carro.component';
import { UserGuard } from './guards/user.guard';
//import { FichaServicoComponent } from './controle/ficha-servico/ficha-servico.component';

const routes: Routes = [
  {
    path: "user/login",
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "relatorio-gerencial",
    loadChildren: () => import('./relatorio-gerencial/relatorio-genrencial.module').then(m => m.RelatorioGerencialModule)
  },
  {
    path: "cliente",
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
  },
  {
    path: "carro",
    loadChildren: () => import('./carro/carro.module').then(m => m.CarroModule)
  },
  {
    path: "controle",
    loadChildren: () => import('./controle/controle.module').then(m => m.ControleModule)
  },
  {
    path: "opcao",
    loadChildren: () => import('./opcao/opcao.module').then(m => m.OpcaoModule)
  },
  { path: "", component: HomeComponent, canActivate: [UserGuard] }
  //{ path: "cliente", component: ClienteComponent, canActivate: [UserGuard] },
  //{ path: "cliente/cadastrar", component: CadastrarClienteComponent, canActivate: [UserGuard] },
  //{ path: "cliente/:id", component: CadastrarClienteComponent, canActivate: [UserGuard] },
  //{ path: "carro", component: CarroComponent, canActivate: [UserGuard] },
  //{ path: "carro/cadastrar", component: CadastrarCarroComponent, canActivate: [UserGuard] },
  //{ path: "controle", component: ControleComponent },
  //{ path: "controle/entrada", component: EntradaComponent, canActivate: [UserGuard] },
  //{ path: "controle/entrada", component: EntradaComponent, canActivate: [UserGuard] },
  //{ path: "controle/:_id", component: EntradaComponent, canActivate: [UserGuard] },
  //{ path: "controle/:_id/add-servico", component: FichaServicoComponent, canActivate: [UserGuard] },
  //{ path: "controle/:_id/:servico_id", component: FichaServicoComponent, canActivate: [UserGuard] },
  //{ path: "opcao", component: OpcaoComponent, canActivate: [UserGuard] },
  //{ path: "opcao/usuario", component: UsuarioComponent, canActivate: [UserGuard] },
  //{ path: "opcao/permissao", component: PermissaoComponent, canActivate: [UserGuard] },
  //{ path: "logout", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
