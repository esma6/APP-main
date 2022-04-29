import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
     RouterModule,
    SharedModule,
    PoModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

})
export class LayoutModule { }
