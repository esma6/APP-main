
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivistsPoolComponent } from './components/activists-pool/activists-pool.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ActivistsPoolComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivistPoolRoutingModule { }
