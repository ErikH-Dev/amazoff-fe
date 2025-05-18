export default function Cart() {
    return (
        <div className="flex flex-row">
            <div className="flex flex-col flex-1 p-8">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                <div className="">
                </div>
                <div className="flex flex-col flex-1 p-4">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <p>No items in the cart to summarize.</p>
                </div>
            </div>
        </div>
    );
}