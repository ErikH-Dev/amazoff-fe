import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/models/product";

type CartItem = Product & { quantity: number };

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    clearCart: () => void;
    updateCartItem: (product: Product, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product_id === product.product_id);
            if (existing) {
                return prev.map((item) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (product: Product) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateCartItem = (product: Product, quantity: number) => {
        if (quantity <= 0) {
            setCart((prev) => prev.filter((item) => item.product_id !== product.product_id));
        } else {
            setCart((prev) =>
                prev.map((item) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity }
                        : item
                )
            );
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}