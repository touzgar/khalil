import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../../authentication/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/Club']);
      return false;
    }
  }
}
