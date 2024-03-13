import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CostSharingGroupsComponent } from './cost-sharing-groups.component';
import { CardComponent } from './components/card/card.component';
import { CostSharingDetailComponent } from './cost-sharing-detail/cost-sharing-detail.component';
import { CostSharingListComponent } from './cost-sharing-list/cost-sharing-list.component';
import { CostSharingGroupsRoutingModule } from './cost-sharing-groups-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CostSharingGroupsRoutingModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  declarations: [CostSharingGroupsComponent,
    CostSharingListComponent,
    CostSharingDetailComponent,
    CardComponent]
})
export class CostSharingGroupsModule { }
