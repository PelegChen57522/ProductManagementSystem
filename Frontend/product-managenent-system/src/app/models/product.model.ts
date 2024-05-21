// src/app/models/product.model.ts
import { Price } from './price.model';
import { Size } from './size.model';

export interface Product {
  Pid: string;
  Name: string;
  Price: Price;
  Size: Size;
}
