
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ExpenseGroup } from 'src/app/domain/models/expenseGroup.model';
import { ExpenseGroupMapper } from '../mappers/expenseGroup.mapper';




@Injectable({
    providedIn: 'root',
})
export class ExpenseGroupService {



    constructor() { }

    getExpenseGroups(idUSer: number): Observable<ExpenseGroup[]> {
        const expenseGroupString = localStorage.getItem('expenseGroup');
        const expenseGroupTable = expenseGroupString ? JSON.parse(expenseGroupString) : [];
        let result = [];

        if (expenseGroupTable.length > 0) {
            result = expenseGroupTable.filter((row: ExpenseGroup) => row.owner === idUSer).reverse();
        }
        return of(result.map((row: ExpenseGroup) => ExpenseGroupMapper.fromApiToDomain(row)));
    }
    getExpenseGroupById(idExpenseGroup: number): Observable<ExpenseGroup> {

        const expenseGroupString = localStorage.getItem('expenseGroup');
        const expenseGroupTable = expenseGroupString ? JSON.parse(expenseGroupString) : null;

        const result = expenseGroupTable?.find((row: ExpenseGroup) => row.id === idExpenseGroup)

        const returnValue = result ? ExpenseGroupMapper.fromApiToDomain(result) : {} as ExpenseGroup
        return of(returnValue);
    }

    addExpenseGroup(expenseGroup: ExpenseGroup): Observable<boolean> {
        const newExpenseGroup = ExpenseGroupMapper.fromDomainToApi(expenseGroup);

        let currentExpenseGroupDb: ExpenseGroup[] = [];
        this.getExpenseGroups(expenseGroup.owner).subscribe(result => {
            currentExpenseGroupDb = result || []
        });

        newExpenseGroup.id = this.getNewIndex(newExpenseGroup.owner);
        currentExpenseGroupDb.push(newExpenseGroup);
        localStorage.setItem('expenseGroup', JSON.stringify(currentExpenseGroupDb));

        const expenseGroupStored = localStorage.getItem('expenseGroup');

        return of(expenseGroupStored !== null && expenseGroupStored.length > 0)


    }

    updateExpenseGroup(expenseGroup: ExpenseGroup): Observable<boolean> {
        const newExpenseGroup = ExpenseGroupMapper.fromDomainToApi(expenseGroup);

        let currentExpenseGroupDb: ExpenseGroup[] = [];
        this.getExpenseGroups(expenseGroup.owner).subscribe(result => {
            currentExpenseGroupDb = result || []
        });

        const indexOld = currentExpenseGroupDb.findIndex(myExpenseGroup => myExpenseGroup.id === expenseGroup.id)
        currentExpenseGroupDb[indexOld] = expenseGroup;

        localStorage.setItem('expenseGroup', JSON.stringify(currentExpenseGroupDb));

        const expenseGroupStored = localStorage.getItem('expenseGroup');

        return of(expenseGroupStored !== null && expenseGroupStored.length > 0)


    }

    getNewIndex(idUSer: number) {
        let resultIndex = 0;
        const list = this.getExpenseGroups(idUSer).subscribe(result => {
            const length = result.length;
            resultIndex = result[length - 1].id;
        })

        return resultIndex + 1;
    }

}
