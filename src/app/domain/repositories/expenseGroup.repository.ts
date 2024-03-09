import { Observable } from 'rxjs';

import { Expense } from '../models/expense.model';

export abstract class ExpenseGroupRepository {
    abstract getExpenses(): Observable<Expense[]>;
    abstract addExpense(expense: Expense): Observable<Expense>;
    abstract deleteExpenses(id: number): Observable<void>;
}
