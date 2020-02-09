import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
import { HttpClientModule } from '@angular/common/http';

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
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxMaskModule } from 'ngx-mask';
import { InterceptorModule } from './modules/interceptor/interceptor.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

//import { LoginComponent } from './user/login/login.component';
//import { RelatorioGerencialComponent } from './relatorio-gerencial/relatorio-gerencial.component';
//import { ClienteComponent } from './cliente/cliente.component';
//import { CadastrarClienteComponent } from './cliente/cadastrar-cliente/cadastrar-cliente.component';
//import { DeletarClienteComponent } from './cliente/deletar-cliente/deletar-cliente.component';

import { MainNavComponent } from './main-nav/main-nav.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ControleComponent, AlterarSaidaDialogComponent, DeletarServicoDialogComponent } from './controle/controle.component';
import { HomeComponent } from './home/home.component';
import { EntradaComponent } from './controle/entrada/entrada.component';
import { OpcaoComponent } from './opcao/opcao.component';
import { UsuarioComponent } from './opcao/usuario/usuario.component';
import { PermissaoComponent } from './opcao/permissao/permissao.component';
import { CadastrarCarroComponent } from './carro/cadastrar-carro/cadastrar-carro.component';
import { DeletarCarroComponent } from './carro/deletar-carro/deletar-carro.component';
import { AtualizarCarroComponent } from './carro/atualizar-carro/atualizar-carro.component';
import { CarroComponent } from './carro/carro.component';

import { SaidaDialogComponent } from './controle/saida-dialog/saida-dialog.component';
import { FichaServicoComponent } from './controle/ficha-servico/ficha-servico.component';
import { RegistrarRetornoDialogComponent } from './controle/registrar-retorno-dialog/registrar-retorno-dialog.component';


registerLocaleData(localeBr, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    BreadcrumbComponent,
    HomeComponent,
    ControleComponent,
    EntradaComponent,
    OpcaoComponent,
    UsuarioComponent,
    PermissaoComponent,
    //LoginComponent,
    //RelatorioGerencialComponent,
    //ClienteComponent,
    //CadastrarClienteComponent,
    //DeletarClienteComponent,
    CarroComponent,
    CadastrarCarroComponent,
    DeletarCarroComponent,
    AtualizarCarroComponent,
    FichaServicoComponent,
    SaidaDialogComponent,
    AlterarSaidaDialogComponent,
    DeletarServicoDialogComponent,
    RegistrarRetornoDialogComponent
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
    InterceptorModule,
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
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatBadgeModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),

    RxReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ { provide: LOCALE_ID, useValue: "pt-BR" }],
  bootstrap: [AppComponent],
  entryComponents: [
  //  DeletarClienteComponent,
    AtualizarCarroComponent,
    DeletarCarroComponent, 
    SaidaDialogComponent,
    AlterarSaidaDialogComponent,
    DeletarServicoDialogComponent,
    RegistrarRetornoDialogComponent
  ]
})
export class AppModule { }
