import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginService } from './login-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.loginService.getUserRole().pipe(
      take(1),
      map((role) => {
        if (role === 'ADMIN') {
          if (state.url.startsWith('/home')) {
            return true;
          } else {
            this.router.navigate(['/home']);
            return false;
          }
        } else if (role === 'USER') {
          if (state.url.startsWith('/homeUser')) {
            return true;
          } else {
            this.router.navigate(['/homeUser']);
            return false;
          }
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
