

import { Expense } from "src/app/domain/models/expense.model";

import { ExpenseDTO } from "../dto/expense.dto";

export class ExpenseMapper {
    static fromApiToDomain({ id, expenseGroup, description, payer, amount, paymentDate, currency }: ExpenseDTO): Expense {
        return {
            id,
            expenseGroup,
            description,
            payer,
            amount,
            paymentDate,
            currency,



        };
    }

    static fromDomainToApi({ id, expenseGroup, description, payer, amount, paymentDate, currency }: Expense): ExpenseDTO {
        return {
            id,
            expenseGroup,
            description,
            payer,
            amount,
            paymentDate,
            currency,
        };
    }
}