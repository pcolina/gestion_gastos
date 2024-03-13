import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';


import { ExpenseGroup } from 'src/app/domain/models/expenseGroup.model';
import { ExpenseGroupRepository } from 'src/app/domain/repositories/expenseGroup.repository';
import { UserService } from '../services/user.service';
import { ExpenseGroupService } from '../services/expenseGroup.service';

@Injectable({
    providedIn: 'root',
})
export class ExpenseGroupUsecase implements ExpenseGroupRepository {
    constructor(private expenseGroupService: ExpenseGroupService) { }

    getExpenseGroups(idUser: number): Observable<ExpenseGroup[]> {
        return this.expenseGroupService.getExpenseGroups(idUser)

    }

    addExpenseGroup(expenseGroup: ExpenseGroup) {
        this.expenseGroupService.addExpenseGroup(expenseGroup);

        const hasBeenSaved: boolean = !!this.getExpenseGroupById(expenseGroup.id)
        return of(hasBeenSaved)
    }

    updateExpenseGroup(expenseGroup: ExpenseGroup) {
        this.expenseGroupService.updateExpenseGroup(expenseGroup);

        const hasBeenSaved: boolean = !!this.getExpenseGroupById(expenseGroup.id)
        return of(hasBeenSaved)
    }

    getExpenseGroupById(idExpenseGroup: number) {
        return this.expenseGroupService.getExpenseGroupById(idExpenseGroup);
    }
}