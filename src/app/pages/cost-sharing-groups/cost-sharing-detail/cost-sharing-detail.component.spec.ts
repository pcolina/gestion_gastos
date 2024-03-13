/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CostSharingDetailComponent } from './cost-sharing-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ExpenseGroupUsecase } from 'src/app/infrastructure/user-cases/expenseGroup.usecase';
import { ExpenseUsecase } from 'src/app/infrastructure/user-cases/expense.usecase';

describe('CostSharingDetailComponent', () => {
  let component: CostSharingDetailComponent;
  let expenseGroupUsecase: ExpenseGroupUsecase;
  let expenseUsecase: ExpenseUsecase;
  let fixture: ComponentFixture<CostSharingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostSharingDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { idExpenseGroup: '1' } },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostSharingDetailComponent);
    component = fixture.componentInstance;
    expenseUsecase = TestBed.inject(ExpenseUsecase);
    expenseGroupUsecase = TestBed.inject(ExpenseGroupUsecase);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
