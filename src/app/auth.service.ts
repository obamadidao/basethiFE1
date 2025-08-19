import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'currentUser';

  constructor() {}

  setCurrentUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  getCurrentUser(): any | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }


  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
