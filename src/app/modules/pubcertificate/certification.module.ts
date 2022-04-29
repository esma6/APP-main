

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ClipboardModule } from 'ngx-clipboard';
import { CertificateComponent } from './components/certificate/certificate.component';
import { CertificateRoutingModule } from './certificate-routing.module';

@NgModule({
  declarations: [
    CertificateComponent
  ],
  imports: [
    CommonModule,
    CertificateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PoModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class CertificateModule { }
