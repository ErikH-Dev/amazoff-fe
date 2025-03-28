import ProductItem from "@/components/ProductItem";
import { Product } from "@/interfaces/product";

export default function Products() {
  const dummyProducts: Product[] = [
    {
      id: 1,
      name: "Football",
      price: 9.99,
      description: "A round object used in the game of football.",
      vendor: "Football Co.",
    },
    {
      id: 2,
      name: "Basketball",
      price: 14.99,
      description: "A ball used in the game of basketball.",
      vendor: "Basketball Inc.",
    },
    {
      id: 3,
      name: "Tennis Ball",
      price: 4.99,
      description: "A small ball used in the game of tennis.",
      vendor: "Tennis Supplies",
    },
    {
      id: 4,
      name: "Baseball",
      price: 7.99,
      description: "A ball used in the game of baseball.",
      vendor: "Baseball Gear",
    },
    {
      id: 5,
      name: "Volleyball",
      price: 12.99,
      description: "A ball used in the game of volleyball.",
      vendor: "Volleyball World",
    },
    {
      id: 6,
      name: "Cricket Ball",
      price: 8.99,
      description: "A ball used in the game of cricket.",
      vendor: "Cricket Supplies",
    },
    {
      id: 7,
      name: "Rugby Ball",
      price: 15.99,
      description: "A ball used in the game of rugby.",
      vendor: "Rugby Gear",
    },
    {
      id: 8,
      name: "Ping Pong Ball",
      price: 2.99,
      description: "A small ball used in the game of table tennis.",
      vendor: "Ping Pong World",
    },
    {
      id: 9,
      name: "Golf Ball",
      price: 5.99,
      description: "A small ball used in the game of golf.",
      vendor: "Golf Supplies",
    },
    {
      id: 10,
      name: "Hockey Puck",
      price: 6.99,
      description: "A puck used in the game of hockey.",
      vendor: "Hockey Gear",
    },
    {
      id: 11,
      name: "Soccer Ball",
      price: 10.99,
      description: "A ball used in the game of soccer.",
      vendor: "Soccer World",
    },
    {
      id: 12,
      name: "Dodgeball",
      price: 9.49,
      description: "A ball used in the game of dodgeball.",
      vendor: "Dodgeball Co.",
    },
    {
      id: 13,
      name: "Softball",
      price: 7.49,
      description: "A ball used in the game of softball.",
      vendor: "Softball Supplies",
    },
    {
      id: 14,
      name: "Handball",
      price: 6.49,
      description: "A ball used in the game of handball.",
      vendor: "Handball Inc.",
    },
    {
      id: 15,
      name: "Bowling Ball",
      price: 29.99,
      description: "A heavy ball used in the game of bowling.",
      vendor: "Bowling Supplies",
    },
  ];


  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
      {dummyProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}