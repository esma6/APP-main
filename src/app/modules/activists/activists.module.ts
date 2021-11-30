import { ActivistsRoutingModule } from './activists-routing.module';
import { ActivistsComponent } from './components/activists/activists.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    ActivistsComponent
  ],
  imports: [
    CommonModule,
    ActivistsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PoModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class ActivistsModule { }
