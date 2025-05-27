import { Order } from "@/models/order";
import { OrderItem } from "@/models/orderitem";
import { Product } from "@/models/product";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type CartItem = Product & { quantity: number };

export async function createOrder(cartItems: CartItem[], buyerId: number): Promise<void> {
  try {
    const orderItems: OrderItem[] = cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity
    })); 

    const order: Order = {
      buyer_id: buyerId,
      order_items: orderItems
    };

    await axios.post(`${API_BASE_URL}/orders`, order);
    console.log("Order created successfully");
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function getOrdersByUser(userId: number): Promise<Order[]> {
  try {
    const response = await axios.get<Order[]>(`${API_BASE_URL}/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getOrderById(orderId: number): Promise<Order> {
  try {
    const response = await axios.get<Order>(`${API_BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}