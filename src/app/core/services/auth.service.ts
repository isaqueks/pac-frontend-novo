import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from 'src/app/store/Authentication/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { Store } from '@ngrx/store';
import { RegisterSuccess, loginFailure, loginSuccess, logout, logoutSuccess } from 'src/app/store/Authentication/authentication.actions';
import { IUser } from '../models/user.entity';

const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    constructor(
        private http: HttpClient
    ) { }

    private userCache: IUser;


    public signIn(email: string, password: string): Observable<string> {
        return this.http.post<{ token: string }>(`/auth/signin`, { email, password })
        .pipe(map(res => {
            localStorage.setItem('token', res.token);
            return res.token;
        }))
    }

    public signOut(): Observable<void> {
        localStorage.removeItem('token');
        return new Observable(subscriber => {
            subscriber.next();
            subscriber.complete();
        });
    }

    public getLoggedUser(): Observable<IUser> {
        if (this.userCache) {
            return new Observable(subscriber => {
                subscriber.next(this.userCache);
                subscriber.complete();
            });
        }
        return this.http.get<IUser>(`/users/current-user`)
        .pipe(map(user => {
            this.userCache = user;
            return user;
        }))
    }

}

