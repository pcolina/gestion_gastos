
import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ExpenseGroup } from 'src/app/domain/models/expenseGroup.model';
import { ExpenseGroupMapper } from '../mappers/expenseGroup.mapper';
import { Expense } from 'src/app/domain/models/expense.model';
import { ExpenseMapper } from '../mappers/expense.mapper';
import { STORAGE } from 'src/app/app.module';




@Injectable({
    providedIn: 'root',
})
export class ExpensesService {


    constructor(@Inject(STORAGE) private localStorage: Storage) { }


    getExpenses(idExpenseGroup: number = -1): Observable<Expense[]> {
        const expensesListString = this.localStorage.getItem('expenses');
        const expensesList = expensesListString ? JSON.parse(expensesListString) : [];

        let result: Expense[] = [];

        if (expensesList.length > 0 && idExpenseGroup > 0) {
            result = expensesList.filter((row: Expense) => row.expenseGroup === idExpenseGroup)

        }
        else if (idExpenseGroup < 0) {
            result = expensesList;
        }

        const orderResult = result.sort((a, b) => new Date(a.paymentDate).getTime() + new Date(b.paymentDate).getTime());
        return of(result.map((expense: Expense) => ExpenseMapper.fromApiToDomain(expense)));
    }

    addExpense(expense: Expense, idExpenseGroup: number): Observable<boolean> {
        let newExpense = ExpenseMapper.fromDomainToApi(expense);
        newExpense.id = this.getNewIndex();

        const currentExpenseDb = JSON.parse(this.localStorage.getItem('expenses') || '[]');
        const previousExpenseDBLength = currentExpenseDb.length;

        currentExpenseDb.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(currentExpenseDb));

        const expenseGroupStored = JSON.parse(this.localStorage.getItem('expenses') || '[]');

        return of(expenseGroupStored.length === previousExpenseDBLength + 1)


    }

    getNewIndex() {
        let resultIndex = 0;
        const list = this.getExpenses().subscribe(result => {
            const length = result.length;
            resultIndex = result[length - 1].id;
        })

        return resultIndex + 1;
    }
}
