import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"controle",component:HomeComponent},
  {path:"controle/entrada",component:HomeComponent},
  {path:"controle/saida",component:HomeComponent},
  {path:"configuracao",component:HomeComponent},
  {path:"configuracao/usuario",component:HomeComponent},
  {path:"configuracao/permissao",component:HomeComponent},
  {path:"relatorio-gerencial",component:HomeComponent},
  {path:"logout",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
