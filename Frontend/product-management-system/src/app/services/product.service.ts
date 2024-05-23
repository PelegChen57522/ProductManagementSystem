import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://yourapiurl.com';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, product);
  }
}
