import { OrderItem } from "./orderitem";

export interface Order {
  id: number;
  order_items: OrderItem[];
  status: string;
  order_date: string | Date;
  keycloak_id: string;
  buyer: any | null;
}