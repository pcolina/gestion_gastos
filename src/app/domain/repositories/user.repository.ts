
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

export abstract class UserRepository {
    abstract getUser(idUser: number): Observable<User>;
    // abstract addUser(user: User): Observable<User>;
    // abstract updateUser(user: User): Observable<void>;
}
