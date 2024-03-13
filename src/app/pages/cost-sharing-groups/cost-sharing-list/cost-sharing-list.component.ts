import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TITTLE_ADD_EXPENSE_GROUP, TITTLE_EDIT_EXPENSE_GROUP } from 'src/app/common/commontext';
import { ExpenseGroup } from 'src/app/domain/models/expenseGroup.model';
import { ExpenseGroupUsecase } from 'src/app/infrastructure/user-cases/expenseGroup.usecase';
import { DateHandlerService } from 'src/app/shared/services/dateHandler';

@Component({
  selector: 'app-cost-sharing-list',
  templateUrl: './cost-sharing-list.component.html',
  styleUrls: ['./cost-sharing-list.component.scss']
})
export class CostSharingListComponent implements OnInit {

  public expenseGroupList: ExpenseGroup[] = [];
  public expenseGroupForm: FormGroup = new FormGroup({});

  public isNewExpenseGroupActive = false;
  public selectedExpenseGroup = {} as ExpenseGroup;
  public editAction = false;

  public tittleAdd = TITTLE_ADD_EXPENSE_GROUP;
  public tittleEdit = TITTLE_EDIT_EXPENSE_GROUP;

  public tittlePlusSection = '';

  constructor(private expenseGroupUsecase: ExpenseGroupUsecase,
    private dateHandler: DateHandlerService) { }

  ngOnInit() {
    this.initExpenseGroupForm();
    this.loadExpenseGroup();
    this.initText();
  }

  initExpenseGroupForm() {
    this.expenseGroupForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      friends: new FormControl(''),
    });
  }

  loadExpenseGroup() {
    this.selectedExpenseGroup = {} as ExpenseGroup;
    this.expenseGroupUsecase.getExpenseGroups(1).subscribe(result => {
      this.expenseGroupList = result;
    });
  }

  initText() {
    this.tittlePlusSection = this.editAction ? this.tittleEdit : this.tittleAdd;
  }


  addExpenseGroup() {
    this.isNewExpenseGroupActive = true;
    this.initText();
  }

  saveExpenseGroup() {
    if (this.editAction) {
      this.updateExpenseGroup();
    } else {
      this.newExpenseGroup();
    }
  }
  newExpenseGroup() {
    const newExpenseGroup: ExpenseGroup = this.mapNewExpenseGroup();
    this.expenseGroupUsecase.addExpenseGroup(newExpenseGroup).subscribe(result => {
      this.cleanListView();

      if (result) {
        this.loadExpenseGroup()
      }
    })
  }
  updateExpenseGroup() {
    const newExpenseGroup: ExpenseGroup = this.mapNewExpenseGroup();
    this.expenseGroupUsecase.updateExpenseGroup(newExpenseGroup).subscribe(result => {
      this.cleanListView();

      if (result) {
        this.loadExpenseGroup()
      }
    })
  }

  mapNewExpenseGroup() {
    const result: ExpenseGroup = {
      id: this.selectedExpenseGroup.id || 1,
      owner: this.selectedExpenseGroup.owner || 1,
      description: this.expenseGroupForm.controls.description.value,
      userList: this.expenseGroupForm.controls.friends.value.split(","),
      createDate: this.dateHandler.getCurrentDate(),

    }

    return result;
  }

  cleanListView() {
    this.expenseGroupForm.reset();
    this.isNewExpenseGroupActive = false;
  }


  editGroup(expenseGroup: ExpenseGroup) {
    this.isNewExpenseGroupActive = true;
    this.editAction = true;
    this.selectedExpenseGroup = expenseGroup;
    this.initText();
    this.setFormToEdit(expenseGroup);
  }

  setFormToEdit(expenseGroup: ExpenseGroup) {
    this.expenseGroupForm.controls.description.setValue(expenseGroup.description);
    this.expenseGroupForm.controls.friends.setValue(expenseGroup.userList.join(','));
  }
}
