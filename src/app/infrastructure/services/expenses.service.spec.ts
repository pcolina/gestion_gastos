import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExpensesService } from './expenses.service';
import { of } from 'rxjs';
describe('ExpenseService API', () => {
    let service: ExpensesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(ExpensesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all expenses', (done) => {
        const EXPENSE_MOCK = {
            id: 1,
            expenseGroup: 1,
            description: 'mock',
            payer: 'yo',
            amount: 1,
            paymentDate: 'hoy',
            currency: '€'
        };
        localStorage.setItem('expenses', JSON.stringify([EXPENSE_MOCK]));

        const resultGet = service.getExpenses();

        expect(resultGet === of([EXPENSE_MOCK])).toBeTruthy();
    });

    it('should add one expense', (done) => {
        const EXPENSE_MOCK = {
            id: 1,
            expenseGroup: 1,
            description: 'mock',
            payer: 'yo',
            amount: 1,
            paymentDate: 'hoy',
            currency: '€'
        };

        service.addExpense(EXPENSE_MOCK, 1);

        const resultAdd = JSON.parse(localStorage.getItem('expenses') || '[]');
        expect(resultAdd.length === [EXPENSE_MOCK].length).toBeTruthy();
    });

});