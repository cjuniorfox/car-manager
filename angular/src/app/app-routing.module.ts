import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ControleComponent } from './controle/controle.component';
import { EntradaComponent } from './controle/entrada/entrada.component';
import { SaidaComponent } from './controle/saida/saida.component';
import { OpcaoComponent } from './opcao/opcao.component';
import { UsuarioComponent } from './opcao/usuario/usuario.component';
import { PermissaoComponent } from './opcao/permissao/permissao.component';
import { RelatorioGerencialComponent } from './relatorio-gerencial/relatorio-gerencial.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CarroComponent } from './carro/carro.component';
import { CadastrarCarroComponent } from './carro/cadastrar-carro/cadastrar-carro.component';
import { CadastrarClienteComponent } from './cliente/cadastrar-cliente/cadastrar-cliente.component';
import { LoginComponent } from './user/login/login.component';
import { UserGuard } from './guards/user.guard';
import { LoginGuard } from './guards/login.guard';
import { AndamentoComponent } from './controle/andamento/andamento.component';
import { FichaServicoComponent } from './controle/fichaServico/fichaServico.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [UserGuard] },
  { path: "controle", component: ControleComponent },
  { path: "controle/entrada", component: EntradaComponent, canActivate: [UserGuard] },
  { path: "controle/entrada", component: EntradaComponent, canActivate: [UserGuard] },
  { path: "controle/:_id", component: EntradaComponent, canActivate: [UserGuard] },
  { path: "controle/:_id/add-servico", component: FichaServicoComponent, canActivate: [UserGuard] },
  { path: "controle/andamento", component: AndamentoComponent, canActivate: [UserGuard] },
  { path: "controle/saida", component: SaidaComponent, canActivate: [UserGuard] },
  { path: "cliente", component: ClienteComponent, canActivate: [UserGuard] },
  { path: "cliente/cadastrar", component: CadastrarClienteComponent, canActivate: [UserGuard] },
  { path: "cliente/:id", component: CadastrarClienteComponent, canActivate: [UserGuard] },
  { path: "carro", component: CarroComponent, canActivate: [UserGuard] },
  { path: "carro/cadastrar", component: CadastrarCarroComponent , canActivate: [UserGuard]},
  { path: "opcao", component: OpcaoComponent, canActivate: [UserGuard] },
  { path: "opcao/usuario", component: UsuarioComponent , canActivate: [UserGuard]},
  { path: "opcao/permissao", component: PermissaoComponent, canActivate: [UserGuard] },
  { path: "relatorio-gerencial", component: RelatorioGerencialComponent, canActivate: [UserGuard] },
  { path: "user/login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "logout", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
