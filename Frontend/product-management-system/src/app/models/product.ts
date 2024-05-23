import { Price } from './price';
import { Size } from './size';

export interface Product {
  Pid: string;
  Name: string;
  Price: Price;
  Size: Size;
  UserId: string;
}
