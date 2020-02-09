import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletarCarroComponent } from './deletar-carro/deletar-carro.component';
import { CarroComponent } from './carro.component';
import { AtualizarCarroComponent } from './atualizar-carro/atualizar-carro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CadastrarCarroComponent } from './cadastrar-carro/cadastrar-carro.component';
import { CarroRoutingModule } from './carro-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        CarroRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatButtonModule
    ],
    declarations: [
        CarroComponent, 
        CadastrarCarroComponent, 
        DeletarCarroComponent, 
        AtualizarCarroComponent
    ],
    entryComponents: [DeletarCarroComponent, AtualizarCarroComponent]
})
export class CarroModule { }