import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Import standalone components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'main', component: MainComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/create', component: CreateProductComponent },
      { path: 'products/edit/:id', component: EditProductComponent }
    ])
  ],
  providers: []
})
export class AppModule { }
