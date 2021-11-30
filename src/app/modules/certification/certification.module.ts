import { CertificationRoutingModule } from './certification-routing.module';
import { CertificationComponent } from './components/certification/certification.component';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    CertificationComponent
  ],
  imports: [
    CommonModule,
    CertificationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PoModule,
    NgxQRCodeModule,
    ClipboardModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class CertificationModule { }
