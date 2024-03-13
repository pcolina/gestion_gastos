
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CostSharingListComponent } from './cost-sharing-list.component';
import { ExpenseGroupUsecase } from 'src/app/infrastructure/user-cases/expenseGroup.usecase';
import { of } from 'rxjs';
import { ExpenseGroup } from 'src/app/domain/models/expenseGroup.model';

describe('ConstSharingListComponent', () => {
  let component: CostSharingListComponent;
  let expenseGroupUsecase: ExpenseGroupUsecase;
  let fixture: ComponentFixture<CostSharingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostSharingListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostSharingListComponent);
    component = fixture.componentInstance;
    expenseGroupUsecase = TestBed.inject(ExpenseGroupUsecase);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add Expense Group', () => {
    component.isNewExpenseGroupActive = false;
    component.addExpenseGroup();

    expect(component.isNewExpenseGroupActive).toBeTruthy();
  });

  it('should save Expense Group', () => {
    component.editAction = false;
    const spy = spyOn(component, 'newExpenseGroup');
    component.saveExpenseGroup();

    expect(spy).toHaveBeenCalled();
  });

  it('should update Expense Group', () => {
    component.editAction = true;
    const spy = spyOn(component, 'updateExpenseGroup');
    component.saveExpenseGroup();

    expect(spy).toHaveBeenCalled();
  });


  it('should create new Expense Group', () => {
    component.editAction = true;
    const spy = spyOn(component, 'mapNewExpenseGroup');
    const spy2 = spyOn(expenseGroupUsecase, 'addExpenseGroup').and.returnValue(of(true));
    component.newExpenseGroup();

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should update new Expense Group', () => {
    component.editAction = true;
    const spy = spyOn(component, 'mapNewExpenseGroup');
    const spy2 = spyOn(expenseGroupUsecase, 'updateExpenseGroup').and.returnValue(of(true));
    const spy3 = spyOn(component, 'cleanListView');

    component.updateExpenseGroup();

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('should edit  a Expense Group', () => {
    component.editAction = true;
    const spy = spyOn(component, 'setFormToEdit');
    const spy2 = spyOn(component, 'initText');

    component.editGroup({} as ExpenseGroup);

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
