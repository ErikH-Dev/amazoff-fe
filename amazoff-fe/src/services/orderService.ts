import { Order } from "@/models/order";
import { OrderItem } from "@/models/orderitem";
import { Product } from "@/models/product";
import axios from "axios";
import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type CartItem = Product & { quantity: number };

async function getAuthHeader() {
  const session = await getSession();
  return session?.accessToken
    ? { Authorization: `Bearer ${session.accessToken}` }
    : {};
}

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

    const headers = await getAuthHeader();
    await axios.post(`${API_BASE_URL}/orders`, order, { headers });
    console.log("Order created successfully");
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function getOrdersByUser(userId: number): Promise<Order[]> {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get<Order[]>(`${API_BASE_URL}/orders/user/${userId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getOrderById(orderId: number): Promise<Order> {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get<Order>(`${API_BASE_URL}/orders/${orderId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}