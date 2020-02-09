import { NgModule } from '@angular/core';
import { EntradaComponent } from './entrada/entrada.component';
import { FichaServicoComponent } from './ficha-servico/ficha-servico.component';
import { RegistrarRetornoDialogComponent } from './registrar-retorno-dialog/registrar-retorno-dialog.component';
import { SaidaDialogComponent } from './saida-dialog/saida-dialog.component';
import { AlterarSaidaDialogComponent, ControleComponent, DeletarServicoDialogComponent } from './controle.component';
import { ControleRoutingModule } from './controle-routing.module';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    imports: [
        CommonModule,
        ControleRoutingModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDialogModule,
        NgxMaskModule.forChild(),
        MatIconModule,
        MatDatepickerModule,
        MatButtonModule,
        NgxMaterialTimepickerModule.setLocale('pt-BR'),
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSliderModule,
        MatMenuModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatTableModule,
        MatCardModule,
        MatBadgeModule,
        MatSelectModule,
        MatSlideToggleModule
    ],
    declarations: [
        ControleComponent,
        EntradaComponent,
        FichaServicoComponent,
        RegistrarRetornoDialogComponent,
        SaidaDialogComponent,
        AlterarSaidaDialogComponent,
        DeletarServicoDialogComponent

    ], entryComponents: [
        RegistrarRetornoDialogComponent,
        SaidaDialogComponent,
        AlterarSaidaDialogComponent,
        DeletarServicoDialogComponent
    ]
})

export class ControleModule { }