import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthAccess implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const role = this.authService.getUserRole()?.toLowerCase();
    const allowedRoles = (route.data['roles'] as string[]).map(r => r.toLowerCase());
    
    if (allowedRoles && !allowedRoles.includes(role ?? '')) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
