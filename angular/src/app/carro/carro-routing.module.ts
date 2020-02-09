import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarroComponent } from './carro.component';
import { UserGuard } from '../guards/user.guard';
import { CadastrarCarroComponent } from './cadastrar-carro/cadastrar-carro.component';



const routes: Routes = [
    { path: "", component: CarroComponent, canActivate: [UserGuard] },
    { path: "cadastrar", component: CadastrarCarroComponent, canActivate: [UserGuard] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarroRoutingModule { }