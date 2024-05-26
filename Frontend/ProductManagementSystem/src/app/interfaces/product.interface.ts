import { Price } from './price.interface';
import { Size } from './size.interface';

export interface Product {
  pid: string;
  name: string;
  price: Price;
  size: Size;
}
