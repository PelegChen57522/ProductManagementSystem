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

  ngOnInit(): void {
    const userId = 'currentUserId'; // Replace with actual user ID logic
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => console.error('Failed to load products', error)
    );
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Logout failed', error);
    });
  }
}