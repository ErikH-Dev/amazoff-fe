import { OrderItem } from "./orderitem";

export interface Order {
    buyer_id: number;
    order_items: OrderItem[];
  }