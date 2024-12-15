import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';

  constructor() { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string | null) {
    if (token !== null){
      window.localStorage.setItem("auth_token", token)
    } else {
      window.localStorage.removeItem("auth_token")
    }
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
