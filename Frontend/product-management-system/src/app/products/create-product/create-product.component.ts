import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  createProductForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      currency: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createProductForm.valid) {
      this.productService.createProduct(this.createProductForm.value).subscribe(() => {
        this.router.navigate(['/main']);
      });
    }
  }
}
