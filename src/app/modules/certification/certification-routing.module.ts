import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificationComponent } from './components/certification/certification.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CertificationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificationRoutingModule { }
