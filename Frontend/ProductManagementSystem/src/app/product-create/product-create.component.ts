import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required],
      height: [0, Validators.required],
      width: [0, Validators.required],
      weight: [0, Validators.required],
      measurement: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = {
        pid: '', // This will be set by the backend
        name: this.productForm.value.name,
        price: {
          amount: this.productForm.value.amount,
          currency: this.productForm.value.currency
        },
        size: {
          height: this.productForm.value.height,
          width: this.productForm.value.width,
          weight: this.productForm.value.weight,
          measurement: this.productForm.value.measurement
        }
      };
      this.productService.createProduct(product).subscribe(
        () => this.router.navigate(['/main']),
        error => console.error('Product creation failed', error)
      );
    }
  }
}
