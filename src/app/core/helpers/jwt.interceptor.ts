import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        const currentUser = this.authenticationService;
        if (currentUser && localStorage.getItem('token')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                url: request.url.startsWith('http') ? request.url : `${environment.API_BASE_URL}${request.url}`
            });
        }
        else {
            request = request.clone({
                url: request.url.startsWith('http') ? request.url : `${environment.API_BASE_URL}${request.url}`
            });
        }
        return next.handle(request);
    }
}
