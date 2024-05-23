import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { MainComponent } from './app/main/main.component';
import { ProductsComponent } from './app/products/products.component';
import { CreateProductComponent } from './app/products/create-product/create-product.component';
import { EditProductComponent } from './app/products/edit-product/edit-product.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'main', component: MainComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/create', component: CreateProductComponent },
      { path: 'products/edit/:id', component: EditProductComponent }
    ]),
    importProvidersFrom(HttpClientModule, ReactiveFormsModule, FormsModule)
  ]
}).catch(err => console.error(err));
