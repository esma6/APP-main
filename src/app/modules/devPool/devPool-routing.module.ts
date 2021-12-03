
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevPoolComponent } from './components/dev-pool/dev-pool.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DevPoolComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevPoolRoutingModule { }
