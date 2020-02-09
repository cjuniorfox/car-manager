import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClienteComponent } from './cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DeletarClienteComponent } from './deletar-cliente/deletar-cliente.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { CadastrarClienteComponent } from './cadastrar-cliente/cadastrar-cliente.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    NgxMaskModule.forChild()
  ],
  declarations: [ClienteComponent,DeletarClienteComponent,CadastrarClienteComponent],
  entryComponents:[DeletarClienteComponent]
})
export class ClienteModule { }