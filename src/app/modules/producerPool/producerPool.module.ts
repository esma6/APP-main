import { SharedModule } from './../../shared/shared.module';
import { ProducerPoolRoutingModule } from './producerPool-routing.module';
import { ProducerPoolComponent } from './components/producer-pool/producer-pool.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoModule,PoStepperModule  } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    ProducerPoolComponent,
  ],
  imports: [
    CommonModule,
    ProducerPoolRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    PoStepperModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProducerPoolModule { }
