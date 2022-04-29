
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionsComponent } from './components/inspections/inspections.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: InspectionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionsRoutingModule { }
