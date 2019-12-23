import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//bootstrap-material
import { NavbarModule, InputsModule, WavesModule, ButtonsModule, IconsModule, DropdownModule, BreadcrumbModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { EntradaComponent } from './controle/entrada/entrada.component';
import { SaidaComponent } from './controle/saida/saida.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    EntradaComponent,
    SaidaComponent,
    ContactFormComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NavbarModule,
    InputsModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    BreadcrumbModule,
    DropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
