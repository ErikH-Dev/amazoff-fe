import { useCart } from "@/contexts/CartContext";

export default function Cart() {
    const { cart, removeFromCart, clearCart, updateCartItem } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="flex flex-row">
            <div className="flex flex-col flex-1 p-8">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                <div>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cart.map((item) => (
                                <li key={item.product_id} className="flex items-center justify-between mb-4">
                                    <div>
                                        <span className="font-bold">{item.name}</span>
                                        <span className="ml-2 text-sm text-gray-500">x{item.quantity}</span>
                                        <span className="ml-4 text-gray-700">€ {item.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={() => updateCartItem(item, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >-</button>
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={() => updateCartItem(item, item.quantity + 1)}
                                        >+</button>
                                        <button
                                            className="px-2 py-1 bg-red-400 text-white rounded"
                                            onClick={() => removeFromCart(item)}
                                        >Remove</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {cart.length > 0 && (
                    <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                )}
                <div className="flex flex-col flex-1 p-4">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    {cart.length === 0 ? (
                        <p>No items in the cart to summarize.</p>
                    ) : (
                        <div>
                            <p className="font-semibold">Total: € {total.toFixed(2)}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}