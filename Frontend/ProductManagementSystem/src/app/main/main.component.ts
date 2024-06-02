import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      const productsObservable = await this.productService.getProducts();
      productsObservable.subscribe(
        (products: Product[]) => {
          this.products = products;
        },
        (error: any) => console.error('Failed to load products', error)
      );
    } catch (error) {
      console.error('User is not authenticated', error);
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Logout failed', error);
    });
  }
}
