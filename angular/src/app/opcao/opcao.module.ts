import { NgModule } from '@angular/core';
import { OpcaoComponent } from './opcao.component';
import { PermissaoComponent } from './permissao/permissao.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CommonModule } from '@angular/common';
import { OpcaoRoutingModule } from './opcao-routing.module';

@NgModule({
    imports: [
        CommonModule,
        OpcaoRoutingModule
    ],
    declarations: [
        OpcaoComponent,
        PermissaoComponent,
        UsuarioComponent
    ]
})

export class OpcaoModule { }