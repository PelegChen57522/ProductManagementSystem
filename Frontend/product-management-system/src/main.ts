import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'main', loadComponent: () => import('./app/main/main.component').then(m => m.MainComponent) },
      { path: 'products', loadComponent: () => import('./app/products/products.component').then(m => m.ProductsComponent) },
      { path: 'products/create', loadComponent: () => import('./app/products/create-product/create-product.component').then(m => m.CreateProductComponent) },
      { path: 'products/edit/:id', loadComponent: () => import('./app/products/edit-product/edit-product.component').then(m => m.EditProductComponent) }
    ]),
    importProvidersFrom(HttpClientModule, ReactiveFormsModule, FormsModule)
  ]
}).catch(err => console.error(err));
