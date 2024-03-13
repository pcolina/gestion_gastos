import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostSharingListComponent } from './cost-sharing-list/cost-sharing-list.component';
import { CostSharingDetailComponent } from './cost-sharing-detail/cost-sharing-detail.component';
import { HomeComponent } from '../home/home.component';
import { CostSharingGroupsComponent } from './cost-sharing-groups.component';

const routes: Routes = [

  {
    path: '',
    component: CostSharingGroupsComponent,
    children: [
      {
        path: '', component: CostSharingListComponent
      },
      {
        path: 'detail/:idExpenseGroup', component: CostSharingDetailComponent
      },
      {
        path: '**', redirectTo: 'list'
      },

    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostSharingGroupsRoutingModule { }
