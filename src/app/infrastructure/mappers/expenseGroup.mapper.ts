

import { ExpenseGroup } from "src/app/domain/models/expenseGroup.model";
import { ExpenseGroupDTO } from "../dto/expenseGroup.dto";

export class ExpenseGroupMapper {
    static fromApiToDomain({ id, owner, description, userList, createDate }: ExpenseGroupDTO): ExpenseGroup {
        return {
            id,
            owner,
            description,
            userList,
            createDate,

        };
    }

    static fromDomainToApi({ id, owner, description, userList, createDate }: ExpenseGroup): ExpenseGroupDTO {
        return {
            id,
            owner,
            description,
            userList,
            createDate,
        };
    }
}