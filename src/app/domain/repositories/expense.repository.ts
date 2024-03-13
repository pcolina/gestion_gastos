import { Observable } from 'rxjs';

import { Expense } from '../models/expense.model';

export abstract class ExpenseRepository {
    abstract getExpenses(expenseGroup: number): Observable<Expense[]>;
    abstract addExpense(expense: Expense, expenseGroup: number): Observable<boolean>;
    //abstract deleteExpense(id: number): Observable<void>;
}
