import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/userInterface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user';
  private token: string | null = null;
  private tokenKey = 'auth_token';
  private roleKey = 'user_Role';
  private isAuthenticated: boolean = false;
  private role: string|null = ''
  constructor(private http: HttpClient, private router: Router) { }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/register`, user)
  }

  loginUser(email: string, password: string): Observable<any> {
    const body = { email, password }
    return this.http.post<{ token: string,role:string }>(`${this.apiUrl}/login`, body).pipe(
      map(response => {
        console.log(response, "Response");

        console.log(response.token, "RTOKn");
        this.token = response.token;
        this.role = response.role;
        localStorage.setItem(this.tokenKey, this.token)
        localStorage.setItem(this.roleKey, this.role)
        this.isAuthenticated = true;
        console.log("Role", this.role);

        return response;
      })
    )
  }

  getToken(): string | null {
    console.log(this.token);
    return this.token;
  }

  isLoggedIn(): boolean {
    console.log(this.isAuthenticated);
    return this.isAuthenticated, !!this.token;
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return headers;
  }

  logout() {
    this.token = null;
    this.router.navigate(['/auth/login']);
  }

  getRole(): string|null {
    return this.role;
  }




}
