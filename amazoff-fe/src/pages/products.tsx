import ProductItem from "@/components/ProductItem";
import { Product } from "@/models/product";
import { useEffect, useState } from "react";
import { getProducts, searchProducts } from "@/services/productService";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      getProducts()
        .then(setProducts)
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      searchProducts(debouncedSearch)
        .then(setProducts)
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }, [debouncedSearch]);

  return (
    <>
      <div className="flex flex-row items-center">
        <Input
          className="m-4 max-w-[400px]"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
        {products.map((product) => (
          <ProductItem key={product.product_id} product={product} />
        ))}
      </div>
    </>
  );
}