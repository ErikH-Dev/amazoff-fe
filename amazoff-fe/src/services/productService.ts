import { Product } from "@/models/product";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createProduct(product: Product): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/products`, product);
    console.log("Product created successfully");
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: number): Promise<Product> {
  try {
      const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`);
      return response.data;
  } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
  }
}