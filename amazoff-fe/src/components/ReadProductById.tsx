"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/interfaces/product";
import { getProductById } from "@/services/productService";

export default function ReadProductById() {
    const [productId, setProductId] = useState<number>(0);
    const [product, setProduct] = useState<Product>({} as Product);

    const handleReadProductById = async () => {
        try {
            setProduct(await getProductById(productId));
            alert("Product fetched successfully!");
        } catch {
            alert("Error fetching product");
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 w-fit border border-gray-200 rounded-md">
            <h1 className="font-bold">Read product</h1>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="number" placeholder="Product ID" id="productId" value={productId} onChange={(e) => setProductId(parseFloat(e.target.value))} />
                <Button onClick={handleReadProductById} type="submit">Read</Button>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.description}</p>
                </div>
        </div>
    )
}