import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userDetails: any;
  userProducts: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (data: any) => {
        this.userDetails = data;
      },
      (error: any) => {
        console.error('Error fetching user details', error);
      }
    );

    this.authService.getUserProducts().subscribe(
      (products: any[]) => {
        this.userProducts = products;
      },
      (error: any) => {
        console.error('Error fetching user products', error);
      }
    );
  }

  createProduct(): void {
    // Implement your create product logic here
  }

  editProduct(productId: number): void {
    // Implement your edit product logic here
  }
}
