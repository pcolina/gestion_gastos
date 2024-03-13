import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';


import { ExpenseGroup } from 'src/app/domain/models/expenseGroup.model';
import { ExpenseGroupRepository } from 'src/app/domain/repositories/expenseGroup.repository';
import { UserService } from '../services/user.service';
import { ExpenseGroupService } from '../services/expenseGroup.service';
import { ExpenseRepository } from 'src/app/domain/repositories/expense.repository';
import { Expense } from 'src/app/domain/models/expense.model';
import { ExpensesService } from '../services/expenses.service';
import { ExpenseMapper } from '../mappers/expense.mapper';

@Injectable({
    providedIn: 'root',
})
export class ExpenseUsecase {
    constructor(private expenseRepository: ExpenseRepository) { }

    getExpenses(expenseGroup: number): Observable<Expense[]> {
        return this.expenseRepository.getExpenses(expenseGroup)

    }

    addExpense(expense: Expense, idExpensiveGroup: number): Observable<boolean> {
        const newExpense = ExpenseMapper.fromDomainToApi(expense);

        const resultUseCase = this.expenseRepository.addExpense(newExpense, idExpensiveGroup);

        return resultUseCase;
    }



}