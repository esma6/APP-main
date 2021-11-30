import { InspectionRoutingModule } from './inspection-routing.module';
import { InspectionComponent } from './components/inpection/inspection.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PoModule,PoStepperModule  } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    InspectionComponent,
  ],
  imports: [
    CommonModule,
    InspectionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    PoStepperModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class InspectionModule { }
