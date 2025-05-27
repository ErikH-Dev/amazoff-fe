import { Product } from "@/models/product";
import axios from "axios";

const PRODUCT_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/products";

export async function createProduct(product: Product): Promise<Product> {
    try {
        const response = await axios.post<Product>(PRODUCT_API_URL, product);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create product");
    }
}

export async function getProducts(): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>(PRODUCT_API_URL);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
}

export async function getProductById(id: string): Promise<Product> {
    try {
        const response = await axios.get<Product>(`${PRODUCT_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch product");
    }
}