import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId!: string;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      this.loadProduct();
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe(
      (product) => {
        this.productForm.patchValue({
          name: product.name,
          amount: product.price.amount,
          currency: product.price.currency,
          height: product.size.height,
          width: product.size.width,
          weight: product.size.weight,
          measurement: product.size.measurement
        });
      },
      (error) => console.error('Failed to load product', error)
    );
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.valid) {
      const product: Product = {
        pid: this.productId,
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
        const updateProduct$ = await this.productService.updateProduct(this.productId, product);
        updateProduct$.subscribe(
          () => this.router.navigate(['/main']),
          (error: any) => console.error('Product update failed', error)
        );
      } catch (error) {
        console.error('Product update failed', error);
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/main']);
  }
}
