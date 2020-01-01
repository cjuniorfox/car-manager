import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HomeComponent } from './home/home.component';
import { ControleComponent } from './controle/controle.component';
import { EntradaComponent } from './controle/entrada/entrada.component';
import { SaidaComponent } from './controle/saida/saida.component';
import { OpcaoComponent } from './opcao/opcao.component';
import { UsuarioComponent } from './opcao/usuario/usuario.component';
import { PermissaoComponent } from './opcao/permissao/permissao.component';
import { RelatorioGerencialComponent } from './relatorio-gerencial/relatorio-gerencial.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ClienteComponent } from './cliente/cliente.component';
import { VeiculoComponent } from './veiculo/veiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarroComponent } from './carro/carro.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DeletarCarroComponent } from './carro/deletar-carro/deletar-carro.component';
import { CadastrarCarroComponent } from './carro/cadastrar-carro/cadastrar-carro.component';
import { CadastrarClienteComponent } from './cliente/cadastrar-cliente/cadastrar-cliente.component';
import { AtualizarCarroComponent } from './carro/atualizar-carro/atualizar-carro.component';

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
    RelatorioGerencialComponent,
    ClienteComponent,
    VeiculoComponent,
    CarroComponent,
    DeletarCarroComponent,
    CadastrarCarroComponent,
    CadastrarClienteComponent,
    AtualizarCarroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AtualizarCarroComponent, DeletarCarroComponent]
})
export class AppModule { }
