
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PoModule,PoStepperModule  } from '@po-ui/ng-components';
import { ProducersComponent } from './components/producers/producers.component';
import { ProducersRoutingModule } from './producers-routing.module';

@NgModule({
  declarations: [
    ProducersComponent,
  ],
  imports: [
    CommonModule,
    ProducersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    PoStepperModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProducersModule { }
