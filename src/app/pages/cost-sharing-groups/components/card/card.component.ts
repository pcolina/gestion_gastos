import { Component, Input, OnInit } from '@angular/core';
import { Expense } from 'src/app/domain/models/expense.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() set expense(expense: Expense) {
    this._expense = expense;
    this.cardContain = { amount: this._expense.amount, user: this._expense.payer, concept: this._expense.description, description: this._expense.amount, date: this._expense.paymentDate };

  }

  public cardContain = {} as any;
  public _expense = {} as Expense;

  constructor() {
  }

  ngOnInit() {


  }

}
