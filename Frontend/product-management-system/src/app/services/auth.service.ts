import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', { email, password });
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post('/api/register', { firstName, lastName, email, password });
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>('/api/user');
  }

  getUserProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/user/products');
  }
}
