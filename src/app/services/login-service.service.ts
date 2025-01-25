import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../types/login-response.type';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserRole } from '../types/enum-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "http://localhost:8080/security";

  private userRole = new BehaviorSubject<string | null>(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  
  login(login: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + '/login', { login, password }).pipe(
      tap((response) => {
        sessionStorage.setItem('auth-token', response.password); 
        this.userRole.next(response.roles); 
        this.redirectUser(response.roles); 
      })
    );
  }

  
  private redirectUser(role: string) {
    if (role === 'ADMIN') {
      this.router.navigate(['/home']);
      console.log("Admin");
    } else if (role === 'USER') {
      console.log("User");
      this.router.navigate(['/homeUser']);
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
        sessionStorage.setItem("auth-token", value.password)
        sessionStorage.setItem("username", value.login)
      })
    )
  }
}
