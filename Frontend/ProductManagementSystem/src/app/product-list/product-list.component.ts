import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  async ngOnInit(): Promise<void> {
    try {
      const getProducts$ = await this.productService.getProducts();
      getProducts$.subscribe(
        (products) => this.products = products,
        (error) => console.error('Failed to fetch products', error)
      );
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  }
}
