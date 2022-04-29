

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ClipboardModule } from 'ngx-clipboard';
import { ResearcherPoolComponent } from './components/researcher-pool/researcher-pool.component';
import { ResearcherPoolRoutingModule } from './researcherPool-routing.module';

@NgModule({
  declarations: [
    ResearcherPoolComponent
  ],
  imports: [
    CommonModule,
    ResearcherPoolRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PoModule,
    NgxQRCodeModule,
    ClipboardModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class ResearcherPoolModule { }
