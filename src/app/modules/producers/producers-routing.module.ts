
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProducersComponent } from './components/producers/producers.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProducersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducersRoutingModule { }
