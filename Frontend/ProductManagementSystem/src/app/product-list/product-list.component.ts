import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    const productsObservable = await this.productService.getProducts();
    productsObservable.subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => console.error('Failed to load products', error)
    );
  }
}
