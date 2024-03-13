import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ExpenseGroup } from 'src/app/domain/models/expenseGroup.model';
import { ExpenseGroupUsecase } from 'src/app/infrastructure/user-cases/expenseGroup.usecase';
import { DateHandlerService } from 'src/app/shared/services/dateHandler';

@Component({
  selector: 'app-cost-sharing-groups',
  templateUrl: './cost-sharing-groups.component.html',
  styleUrls: ['./cost-sharing-groups.component.scss']
})
export class CostSharingGroupsComponent {

  public expenseGroupList: ExpenseGroup[] = [];
  public expenseGroupForm: FormGroup = new FormGroup({});

  public isNewExpenseGroupActive = false;

  constructor(private expenseGroupUsecase: ExpenseGroupUsecase,
    private dateHandler: DateHandlerService) { }



}
