import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Product } from "@/interfaces/product";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductItem({ product }: Readonly<{ product: Product }>) {
    return (
        <Link href={`/products/${product.id}`} passHref>
            <motion.div
                className="flex flex-col border-2 border-slate-300 rounded-lg m-2 p-4 w-full max-w-xs min-w-8 cursor-pointer hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AspectRatio ratio={1 / 1}>
                    <Image
                        src="/product-skeleton.png"
                        alt="Product Image"
                        fill
                        className="object-cover rounded-lg"
                    />
                </AspectRatio>
                <div className="flex flex-row items-center mt-2">
                    <div className="flex flex-col justify-between">
                        <span className="font-bold">{product.name}</span>
                        <span className="font-light">{product.vendor}</span>
                    </div>
                    <span className="font-bold ml-auto">€ {product.price}</span>
                </div>
            </motion.div>
        </Link>
    );
}