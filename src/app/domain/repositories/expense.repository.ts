import { Observable } from 'rxjs';

import { Expense } from '../models/expense.model';

export abstract class ExpenseRepository {
    abstract getExpenses(): Observable<Expense[]>;
    abstract addExpense(expense: Expense): Observable<Expense>;
    abstract deleteExpenses(id: number): Observable<void>;
}
