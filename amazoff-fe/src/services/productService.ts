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

export async function addProduct(product: Product): Promise<void> {
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

export async function searchProducts(q: string): Promise<Product[]> {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products/search`, {
      params: { q },
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
}

export async function getProductsByVendorId(): Promise<Product[]> {
  // try {
  //   const headers = await getAuthHeader();
  //   const response = await axios.get<Product[]>(`${API_BASE_URL}/products/vendor/}`, { headers });
  //   return response.data;
  // } catch (error) {
  //   console.error("Error fetching products by vendor ID:", error);
  //   throw error;
  // }

  //TODO: uncommnent the above code when the backend is ready
  return getProducts();
}

export async function updateProduct(product: Product): Promise<void> {
  try {
    const headers = await getAuthHeader();
    await axios.put(`${API_BASE_URL}/products/`, product, { headers });
    console.log("Product updated successfully");
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
export async function deleteProduct(id: number): Promise<void> {
  try {
    const headers = await getAuthHeader();
    await axios.delete(`${API_BASE_URL}/products/${id}`, { headers });
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}