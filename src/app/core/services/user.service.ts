import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.entity';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }
    /***
     * Get All User
     */
    getAll() {
        return this.http.get<IUser[]>(`api/users`);
    }

    /***
     * Facked User Register
     */
    register(user: IUser) {
        return this.http.post(`/users/register`, user);
    }
}
