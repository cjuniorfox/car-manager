import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    imports: [
      LoginRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule
    ],
    declarations: [LoginComponent]
  })
  export class LoginModule { }