import { SigninComponent } from './modules/auth/components/signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guards/guest-guard.ts.guard';
import { DashboardLayoutComponent } from './layout/components/dashboard-layout/dashboard-layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './guards/auth-guard.ts.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [GuestGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'certificate',
    canActivate: [GuestGuard],
    loadChildren: () =>
      import('./modules/pubcertificate/certification.module').then((m) => m.CertificateModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./modules/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: 'new-inspection',
        loadChildren: () =>
          import('./modules/inspections/inspections.module').then(
            (m) => m.InspectionsModule
          ),
      },
      {
        path: 'realize-inspection',
        loadChildren: () =>
          import('./modules/inspection/inspection.module').then(
            (m) => m.InspectionModule
          ),
      },
      {
        path: 'producer-ranking',
        loadChildren: () =>
          import('./modules/producers/producers.module').then(
            (m) => m.ProducersModule
          ),
      },
      {
        path: 'activist-ranking',
        loadChildren: () =>
          import('./modules/activists/activists.module').then(
            (m) => m.ActivistsModule
          ),
      },
      {
        path: 'account/:id',
        loadChildren: () =>
          import('./modules/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      {
        path: 'certificate/:id',
        loadChildren: () =>
          import('./modules/certification/certification.module').then(
            (m) => m.CertificationModule
          ),
      },

      {
        path: 'producer-pool/:id',
        loadChildren: () =>
          import('./modules/producerPool/producerPool.module').then(
            (m) => m.ProducerPoolModule
          ),
      },
      {
        path: 'activist-pool/:id',
        loadChildren: () =>
          import('./modules/activistPool/activistPool.module').then(
            (m) => m.ActivistPoolModule
          ),
      },

      {
        path: 'developers-pool/:id',
        loadChildren: () =>
          import('./modules/devPool/devPool.module').then(
            (m) => m.DevPoolModule
          ),
      },

      {
        path: 'researcher-pool/:id',
        loadChildren: () =>
          import('./modules/researcherPool/researcherPool.module').then(
            (m) => m.ResearcherPoolModule
          ),
      },
    ],
  },

  { path: 'not-found', component: NotFoundComponent },

  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
