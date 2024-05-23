import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://yourapiurl.com';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register`, user);
  }

  login(user: { Email: string; Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, user);
  }
}
