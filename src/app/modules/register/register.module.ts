import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PoModule,PoStepperModule  } from '@po-ui/ng-components';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    PoStepperModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class RegisterModule { }
