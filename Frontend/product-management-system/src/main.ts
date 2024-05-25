import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { MainComponent } from './app/main/main.component';
import { ProductsComponent } from './app/products/products.component';
import { CreateProductComponent } from './app/products/create-product/create-product.component';
import { EditProductComponent } from './app/products/edit-product/edit-product.component';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'main', component: MainComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'products/create', component: CreateProductComponent },
        { path: 'products/edit/:id', component: EditProductComponent }
      ])
    ),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
