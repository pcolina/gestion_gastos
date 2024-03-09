
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { UserMapper } from 'src/app/infrastructure/mappers/user.mapper';
import { User } from 'src/app/domain/models/user.model';


@Injectable({
    providedIn: 'root',
})
export class UserService {


    constructor() { }

    getUser(idUser: number): Observable<User> {
        const storedString = localStorage.getItem('user_'.concat(idUser.toString()));
        const storedUser = storedString ? JSON.parse(storedString) : null;

        return of(UserMapper.fromApiToDomain(storedUser));
    }

    addUser(user: User): Observable<boolean> {
        const apiUser = UserMapper.fromDomainToApi(user);
        localStorage.setItem('user_'.concat(apiUser.id.toString()), JSON.stringify(apiUser));

        const userStored = localStorage.getItem('user_'.concat(apiUser.id.toString()));

        return of(userStored !== null && userStored.length > 0)


    }

}
