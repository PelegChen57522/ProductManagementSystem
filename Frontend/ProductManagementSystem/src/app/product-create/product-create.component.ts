import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
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

  async onSubmit(): Promise<void> {
    if (this.productForm.valid) {
      const product = {
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
      try {
        const createProduct$ = await this.productService.createProduct(product);
        createProduct$.subscribe(
          () => this.router.navigate(['/main']),
          (error: any) => console.error('Product creation failed', error)
        );
      } catch (error) {
        console.error('Product creation failed', error);
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/main']);
  }
}
