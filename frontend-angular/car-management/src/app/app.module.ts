import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HomeComponent } from './home/home.component';
import { ControleComponent } from './controle/controle.component';
import { EntradaComponent } from './controle/entrada/entrada.component';
import { SaidaComponent } from './controle/saida/saida.component';
import { OpcaoComponent } from './opcao/opcao.component';
import { UsuarioComponent } from './opcao/usuario/usuario.component';
import { PermissaoComponent } from './opcao/permissao/permissao.component';
import { RelatorioGerencialComponent } from './relatorio-gerencial/relatorio-gerencial.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    BreadcrumbComponent,
    HomeComponent,
    ControleComponent,
    EntradaComponent,
    SaidaComponent,
    OpcaoComponent,
    UsuarioComponent,
    PermissaoComponent,
    RelatorioGerencialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
