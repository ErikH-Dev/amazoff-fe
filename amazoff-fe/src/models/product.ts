import { Vendor } from "./vendor";

export interface Product {
    product_id?: number;
    vendor_id: number;
    name: string;
    price: number;
    description: string;
    vendor: Vendor;
    stock: number;
  }