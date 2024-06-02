import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
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
    this.productId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(product => {
        this.productForm.patchValue({
          name: product.name,
          amount: product.price.amount,
          currency: product.price.currency,
          height: product.size.height,
          width: product.size.width,
          weight: product.size.weight,
          measurement: product.size.measurement
        });
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct = {
        ...this.productForm.value,
        id: this.productId
      };
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(
        () => this.router.navigate(['/main']),
        error => console.error('Error updating product', error)
      );
    }
  }
}
