import { Observable } from 'rxjs';

import { ExpenseGroup } from '../models/expenseGroup.model';

export abstract class ExpenseGroupRepository {
    abstract getExpenseGroups(idUser: number): Observable<ExpenseGroup[]>;
    abstract getExpenseGroupById(idExpenseGroup: number): Observable<ExpenseGroup>;
    abstract addExpenseGroup(expenseGroup: ExpenseGroup): Observable<boolean>;
    abstract updateExpenseGroup(expenseGroup: ExpenseGroup): Observable<boolean>;
    // abstract deleteExpenseGroup(idExpenseGroup: number): Observable<boolean>;
}
