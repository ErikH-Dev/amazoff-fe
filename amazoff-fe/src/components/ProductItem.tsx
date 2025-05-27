import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/models/product";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ProductItem({ product }: Readonly<{ product: Product }>) {
    const { addToCart } = useCart();
    return (
        <Link href={`/products/${product.id}`} passHref>
            <motion.div
                className="relative flex flex-col border-2 border-slate-300 rounded-lg m-2 p-4 w-full max-w-xs min-w-8 cursor-pointer hover:shadow-lg group transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div
                    className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-md z-10 border-2 border-transparent hover:border-slate-500 opacity-0 group-hover:opacity-100 transition-opacity transition-colors duration-200"
                    onClick={e => {
                        e.preventDefault(); // Prevent navigating to product page
                        addToCart(product);
                    }}
                >
                    <Plus className="h-6 w-6 text-slate-500 hover:text-slate-700" />
                </div>

                <AspectRatio ratio={1 / 1}>
                    <Image
                        src="/product-skeleton.png"
                        alt="Product Image"
                        fill
                        className="object-cover rounded-lg"
                    />
                </AspectRatio>
                <div className="flex flex-row items-center mt-2 text-sm">
                    <div className="flex flex-col justify-between">
                        <span className="font-bold">{product.name}</span>
                        <span className="font-light">{product.vendor.store_name}</span>
                    </div>
                    <span className="font-bold ml-auto">€ {product.price}</span>
                </div>
            </motion.div>
        </Link>
    );
}