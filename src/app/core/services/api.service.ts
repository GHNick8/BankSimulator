import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  get(path: string) { return this.http.get(`${this.base}${path}`); }
  post(path: string, body: unknown) { return this.http.post(`${this.base}${path}`, body); }
  put(path: string, body: unknown) { return this.http.put(`${this.base}${path}`, body); }
  delete(path: string) { return this.http.delete(`${this.base}${path}`); }
}
