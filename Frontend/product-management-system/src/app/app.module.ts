import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Import components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'main', loadComponent: () => import('./main/main.component').then(m => m.MainComponent) },
      { path: 'products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
      { path: 'products/create', loadComponent: () => import('./products/create-product/create-product.component').then(m => m.CreateProductComponent) },
      { path: 'products/edit/:id', loadComponent: () => import('./products/edit-product/edit-product.component').then(m => m.EditProductComponent) }
    ])
  ],
  providers: [],
})
export class AppModule { }
