import { Expense } from "src/app/domain/models/expense.model";

export interface ExpenseDTO {
    id: number,
    expenseGroup: number,
    description: string,
    payer: string,
    paymentDate: string,
    amount: number,
    currency: string,
}


