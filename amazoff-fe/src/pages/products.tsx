import ProductItem from "@/components/ProductItem";
import { Product } from "@/models/product";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
      {products.map((product) => (
        <ProductItem key={product.product_id} product={product} />
      ))}
    </div>
  );
}