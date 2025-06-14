import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../types/login-response.type';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "http://localhost:8081/security";

  private userRole = new BehaviorSubject<string | null>(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(login: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + '/login', { login, password }).pipe(
      tap((response) => {
        localStorage.setItem('auth-token', response.password);
        sessionStorage.setItem('username', response.name);
        this.userRole.next(response.roles);
        this.redirectUser(response.roles, response.userId);
      })
    );
  }

  private redirectUser(role: string, userId?: number) {
    if (role === 'ADMIN') {
      this.router.navigate(['/home']);
    } else if (role === 'USER') {
      if (userId) {
        this.router.navigate(['/homeUser', userId]);
      } else {
        this.router.navigate(['/homeUser']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  getUserRole() {
    return this.userRole.asObservable();
  }

  signup(name: string, email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { name, email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.password);
        sessionStorage.setItem("username", value.login);
      })
    );
  }
}
