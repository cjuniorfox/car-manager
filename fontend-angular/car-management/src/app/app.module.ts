import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//bootstrap-material
import { NavbarModule, WavesModule, ButtonsModule, IconsModule, DropdownModule, BreadcrumbModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { EntradaComponent } from './controle/entrada/entrada.component';
import { SaidaComponent } from './controle/saida/saida.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    EntradaComponent,
    SaidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
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
