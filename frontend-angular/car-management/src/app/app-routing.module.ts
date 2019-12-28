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
import { VeiculoComponent } from './veiculo/veiculo.component';
import { CarroComponent } from './carro/carro.component';
import { CarroCadastroComponent } from './carro/carro-cadastro/carro-cadastro.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"controle",component:ControleComponent},
  {path:"controle/entrada",component:EntradaComponent},
  {path:"controle/saida",component:SaidaComponent},
  {path:"cliente",component:ClienteComponent},
  {path:"veiculo",component:VeiculoComponent},
  {path:"carro",component:CarroComponent},
  {path:"carro/cadastro",component:CarroCadastroComponent},
  {path:"opcao",component:OpcaoComponent},
  {path:"opcao/usuario",component:UsuarioComponent},
  {path:"opcao/permissao",component:PermissaoComponent},
  {path:"relatorio-gerencial",component:RelatorioGerencialComponent},
  {path:"logout",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
