import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Expense } from 'src/app/domain/models/expense.model';
import { ExpenseGroup } from 'src/app/domain/models/expenseGroup.model';
import { ExpensesService } from 'src/app/infrastructure/services/expenses.service';
import { ExpenseUsecase } from 'src/app/infrastructure/user-cases/expense.usecase';
import { ExpenseGroupUsecase } from 'src/app/infrastructure/user-cases/expenseGroup.usecase';

@Component({
  selector: 'app-cost-sharing-detail',
  templateUrl: './cost-sharing-detail.component.html',
  styleUrls: ['./cost-sharing-detail.component.scss']
})
export class CostSharingDetailComponent implements OnInit {

  public isNewExpenseActive = false;
  public showBalance = false;
  public expenseForm: FormGroup = new FormGroup({});


  public idExpenseGroup = -1;
  public groupTittle = '';
  public expenseList: Expense[] = [];
  public debtList: [string, number][] = [];
  public debtList2: any[] = [];
  public debtTexts: string[] = [];
  public balanceTexts: string[] = [];
  public myExpenseGroup: ExpenseGroup = {} as ExpenseGroup;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private expenseUsecase: ExpenseUsecase,
    private expenseGroupUsecase: ExpenseGroupUsecase,
  ) {
    this.idExpenseGroup = Number(this.activatedRoute.snapshot.params['idExpenseGroup']);
    this.groupTittle = this.activatedRoute.snapshot.params['groupTitle'];
  }

  ngOnInit() {
    this.initExpenseForm()
    this.loadExpenses();
    this.loadExpenseGroup()
  }

  initExpenseForm() {
    this.expenseForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      friends: new FormControl(''),
      payer: new FormControl(''),
      paymentDate: new FormControl(''),
      amount: new FormControl(0),
      currency: new FormControl(''),

    });
  }

  loadExpenses() {
    this.expenseUsecase.getExpenses(this.idExpenseGroup).subscribe(result => {
      this.expenseList = result.sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());
    })
  }

  loadExpenseGroup() {
    this.expenseGroupUsecase.getExpenseGroupById(this.idExpenseGroup).subscribe(result => {
      this.myExpenseGroup = result;

    })
  }

  addExpense() {
    this.isNewExpenseActive = true;
  }

  saveExpense() {
    const newExpense: Expense = this.mapNewExpense();
    this.expenseUsecase.addExpense(newExpense, this.idExpenseGroup).subscribe(result => {
      this.isNewExpenseActive = false;
      if (result) {
        this.loadExpenses()

      }
    })
  }

  mapNewExpense() {
    const result: Expense = {
      id: 1,
      expenseGroup: this.idExpenseGroup,
      description: this.expenseForm.controls.description.value,
      payer: this.expenseForm.controls.payer.value,
      amount: this.expenseForm.controls.amount.value,
      paymentDate: this.expenseForm.controls.paymentDate.value,
      currency: this.expenseForm.controls.currency.value || '€',

    }

    return result;
  }

  cancelSaveExpense() {
    this.isNewExpenseActive = false;
  }

  calculateBalance() {
    this.showBalance = !this.showBalance;

    if (this.showBalance) {
      this.debtList = this.getdebtList();


      this.debtList2 = this.debtList.map(row => {
        return [row[0], Math.abs(row[1]).toFixed(2), row[1] < 0 ? '+' : '-'];
      });

      this.debtTexts = this.generateTextList();
    }
  }

  getdebtList() {
    let debtList = [];
    let totalExpense = 0;
    const userAmountMap = new Map<string, number>();

    this.myExpenseGroup.userList.forEach(user => {
      userAmountMap.set(user, 0);
    });

    this.expenseList.forEach(exp => {
      totalExpense += Number(exp.amount);

      if (userAmountMap.has(exp.payer)) {
        userAmountMap.set(exp.payer, Number(userAmountMap.get(exp.payer))! + Number(exp.amount));
      }

    })



    let expenseAverage = totalExpense / this.myExpenseGroup.userList.length;

    userAmountMap.forEach((value, key) => {
      userAmountMap.set(key, expenseAverage - value);
    })

    const keyValueArray = Array.from(userAmountMap);

    return keyValueArray.sort((a, b) => b[1] - a[1]);
  }


  generateTextList() {
    const result: string[] = [];
    let lastIndex = this.debtList.length - 1;

    this.debtList.forEach((user: any, idx: number) => {

      if (this.debtList[lastIndex][1] < 0 && user[1] > 0) {
        if (this.debtList[lastIndex][1] + user[1] < 0) {
          result.push(user[0].concat(' ha de pagar '.concat(user[1].toFixed(2)).concat(' a ').concat(this.debtList[lastIndex][0])));
          this.debtList[lastIndex][1] = this.debtList[lastIndex][1] + user[1];
        } else {
          if (this.debtList[lastIndex][0] !== user[0]) {
            result.push(user[0].concat(' ha de pagar '.concat(Math.abs(this.debtList[lastIndex][1]).toFixed(2).toString()).concat(' a ').concat(this.debtList[lastIndex][0])));
          }
          if (this.debtList[lastIndex - 1][0] !== user[0]) {
            result.push(user[0].concat(' ha de pagar '.concat((this.debtList[lastIndex][1] + user[1]).toFixed(2)).concat(' a ').concat(this.debtList[lastIndex - 1][0])));
          }
          this.debtList[lastIndex - 1][1] = this.debtList[lastIndex - 1][1] + this.debtList[lastIndex][1] + user[1];
        }

      } else {
        lastIndex--;
      }

    });

    return result;
  }
}
