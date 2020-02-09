import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OpcaoComponent } from './opcao.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UserGuard } from '../guards/user.guard';
import { PermissaoComponent } from './permissao/permissao.component';

const routes: Routes = [
    { path: "", component: OpcaoComponent, canActivate: [UserGuard] },
    { path: "usuario", component: UsuarioComponent, canActivate: [UserGuard] },
    { path: "permissao", component: PermissaoComponent, canActivate: [UserGuard] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OpcaoRoutingModule { }