import { Component } from '@angular/core';
import { EXPENSE_HANDLER } from './common/commontext';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = EXPENSE_HANDLER;


}
