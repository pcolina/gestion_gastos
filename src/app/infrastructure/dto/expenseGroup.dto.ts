import { Expense } from "src/app/domain/models/expense.model";

export interface ExpenseGroupDTO {
    id: number,
    owner: number,
    description: string,
    userList: string[],
    createDate: string,
}
