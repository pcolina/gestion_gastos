import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from 'src/app/domain/models/user.model';
import { UserRepository } from './../../domain/repositories/user.repository';
import { UserService } from './../services/user.service';

@Injectable({
    providedIn: 'root',
})
export class UserUsecase implements UserRepository {
    constructor(private userService: UserService) { }

    getUser(idUser: number): Observable<User> {
        return this.userService.getUser(idUser)

    }
}