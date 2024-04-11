import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthServiceService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const authToken = this.authService.getToken(); // Ensure you have a method to get the current token
        const authReq = request.clone({
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${authToken}`
            })
        });
        return next.handle(authReq);
    }
}
