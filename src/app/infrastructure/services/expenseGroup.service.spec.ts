import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExpensesService } from './expenses.service';
import { of } from 'rxjs';
import { ExpenseGroupService } from './expenseGroup.service';
describe('ExpenseGroupService API', () => {
    let service: ExpenseGroupService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(ExpenseGroupService);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all expenses group', (done) => {
        const EXPENSE_GROUP_MOCK = {
            id: 1,
            owner: 1,
            description: 'mock',
            userList: ['mock'],
            createDate: 'hoy',

        };
        localStorage.setItem('expenseGroup', JSON.stringify([EXPENSE_GROUP_MOCK]));

        const resultGet = service.getExpenseGroups(1);

        expect(resultGet === of([EXPENSE_GROUP_MOCK])).toBeTruthy();
    });

    it('should add one expense group', (done) => {
        const EXPENSE_GROUP_MOCK = {
            id: 1,
            owner: 1,
            description: 'mock',
            userList: [],
            createDate: 'hoy',
        };

        service.addExpenseGroup(EXPENSE_GROUP_MOCK);

        const resultAdd = JSON.parse(localStorage.getItem('expenseGroup') || '[]');
        expect(resultAdd.length === [EXPENSE_GROUP_MOCK].length).toBeTruthy();
    });

});