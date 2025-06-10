import { Product } from "@/models/product";
import axios from "axios";
import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getAuthHeader() {
  const session = await getSession();
  return session?.accessToken
    ? { Authorization: `Bearer ${session.accessToken}` }
    : {};
}

export async function createProduct(product: Product): Promise<void> {
  try {
    const headers = await getAuthHeader();
    await axios.post(`${API_BASE_URL}/products`, product, { headers });
    console.log("Product created successfully");
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: number): Promise<Product> {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}