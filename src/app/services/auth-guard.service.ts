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
      take(1), // Obtém o valor atual do papel do usuário
      map((role) => {
        if (role === 'ADMIN') {
          if (state.url.startsWith('/home')) {
            // Permite acesso se a rota for a do admin
            return true;
          } else {
            // Redireciona para a rota de admin se tentar acessar outra página
            this.router.navigate(['/home']);
            return false;
          }
        } else if (role === 'USER') {
          if (state.url.startsWith('/homeUser')) {
            // Permite acesso se a rota for a do usuário
            return true;
          } else {
            // Redireciona para a rota de usuário se tentar acessar outra página
            this.router.navigate(['/homeUser']);
            return false;
          }
        } else {
          // Redireciona para o login caso o papel seja inválido
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
