import { UserDTO } from "src/app/infrastructure/dto/user.dto";
import { User } from "../../domain/models/user.model";

export class UserMapper {
    static fromApiToDomain({ id, name, email, currency }: UserDTO): User {
        return {
            id,
            name,
            email,
            currency

        };
    }

    static fromDomainToApi({ id, name, email, currency }: User): UserDTO {
        return {
            id,
            name,
            email,
            currency
        };
    }
}