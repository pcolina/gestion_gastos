import { Component, OnInit } from '@angular/core';
import { EXPENSE_HANDLER } from 'src/app/common/commontext';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public expense_handler = EXPENSE_HANDLER;

  public menu = ['Mis grupos'];
  constructor() { }

  ngOnInit() {
  }

}
