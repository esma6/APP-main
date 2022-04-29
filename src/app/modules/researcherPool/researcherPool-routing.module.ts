
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearcherPoolComponent } from './components/researcher-pool/researcher-pool.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ResearcherPoolComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResearcherPoolRoutingModule { }
