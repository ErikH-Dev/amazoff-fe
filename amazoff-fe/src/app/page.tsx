import CreateProduct from "@/components/CreateProduct";
import ReadProductById from "@/components/ReadProductById";

export default function Home() {
  return (
    <div className="flex gap-4 p-4">
      <CreateProduct />
      <ReadProductById />
    </div>
  )
}