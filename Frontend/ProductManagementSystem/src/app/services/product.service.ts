import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { getIdToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5244/api/products'; // Update this to your backend URL

  constructor(private http: HttpClient, private auth: Auth) { }

  private async getAuthHeaders(): Promise<HttpHeaders> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      return Promise.reject('User is not authenticated');
    }
    const token = await getIdToken(currentUser);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProducts(): Promise<Observable<any>> {
    return this.getAuthHeaders()
      .then(headers => this.http.get(this.baseUrl, { headers }))
      .catch(error => throwError(() => new Error(error)));
  }

  createProduct(product: any): Promise<Observable<any>> {
    return this.getAuthHeaders()
      .then(headers => this.http.post(this.baseUrl, product, { headers }))
      .catch(error => throwError(() => new Error(error)));
  }

  updateProduct(id: string, product: any): Promise<Observable<any>> {
    return this.getAuthHeaders()
      .then(headers => this.http.put(`${this.baseUrl}/${id}`, product, { headers }))
      .catch(error => throwError(() => new Error(error)));
  }

  deleteProduct(id: string): Promise<Observable<any>> {
    return this.getAuthHeaders()
      .then(headers => this.http.delete(`${this.baseUrl}/${id}`, { headers }))
      .catch(error => throwError(() => new Error(error)));
  }
}
