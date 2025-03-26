import { Product } from "@/interfaces/product";
import axios from "axios";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createProduct(product: Product): Promise<void> {
  try {
    await axios.post("http://localhost:8080/products", product);
    console.log("Product created successfully");
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>("http://localhost:8080/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: number): Promise<Product> {
  try {
      const response = await axios.get<Product>("http://localhost:8080/products/"+id);
      return response.data;
  } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
  }
}