import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api/products'; // Update this to your backend URL

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
