import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = signal<string | null>(localStorage.getItem('token'));
  private _user = signal<{ id: string; name: string } | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  token = this._token.asReadonly();
  user = this._user.asReadonly();

  isLoggedIn() { return !!this._token(); }

  login(token: string, user: { id: string; name: string }) {
    this._token.set(token);
    this._user.set(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  register(name: string) {
    const token = Math.random().toString(36).substring(2);
    const user = { id: Date.now().toString(), name };
    this._token.set(token);
    this._user.set(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this._token.set(null);
    this._user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
