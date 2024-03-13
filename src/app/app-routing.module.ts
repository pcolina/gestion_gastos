import { CostSharingGroupsModule } from './pages/cost-sharing-groups/cost-sharing-groups.module';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: "full" },
  {
    path: 'home', component: HomeComponent,

  },
  {
    path: 'cost-sharing-groups', loadChildren: () => import('./pages/cost-sharing-groups/cost-sharing-groups.module').then(m => m.CostSharingGroupsModule),

  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
