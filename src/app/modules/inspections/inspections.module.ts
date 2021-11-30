
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PoModule,PoStepperModule  } from '@po-ui/ng-components';
import { InspectionsComponent } from './components/inspections/inspections.component';
import { InspectionsRoutingModule } from './inspections-routing.module';

@NgModule({
  declarations: [
    InspectionsComponent,
  ],
  imports: [
    CommonModule,
    InspectionsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    PoStepperModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class InspectionsModule { }
