import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { PoModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CategoriesModule { }
