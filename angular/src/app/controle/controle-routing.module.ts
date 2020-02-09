import { Routes, RouterModule } from "@angular/router";
import { ControleComponent } from './controle.component';
import { EntradaComponent } from './entrada/entrada.component';
import { UserGuard } from '../guards/user.guard';
import { FichaServicoComponent } from './ficha-servico/ficha-servico.component';
import { NgModule } from '@angular/core';

const routes : Routes = [
    { path: "", component: ControleComponent },
    { path: "entrada", component: EntradaComponent, canActivate: [UserGuard] },
    { path: ":_id", component: EntradaComponent, canActivate: [UserGuard] },
    { path: ":_id/add-servico", component: FichaServicoComponent, canActivate: [UserGuard] },
    { path: ":_id/:servico_id", component: FichaServicoComponent, canActivate: [UserGuard] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ControleRoutingModule {}