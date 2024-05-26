import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const userId = 'currentUserId'; // Replace with the actual user ID from the logged-in user
    this.productService.getProductsByUser(userId).subscribe(
      products => {
        // Logic to display products
        console.log('Products:', products);
      },
      error => console.error('Failed to load products', error)
    );
  }
}
