import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { Auth } from '@angular/fire/auth';
import { getIdToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5110/api/products';

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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
