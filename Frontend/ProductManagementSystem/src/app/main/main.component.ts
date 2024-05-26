import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductService } from '../services/product.service';
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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const userId = 'currentUserId'; // Replace with actual user ID logic
    this.productService.getProductsByUser(userId).subscribe(
      (products) => {
        this.products = products;
      },
      (error) => console.error('Failed to load products', error)
    );
  }
}
