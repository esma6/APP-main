

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProducerPoolComponent } from './components/producer-pool/producer-pool.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProducerPoolComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducerPoolRoutingModule { }
