import CreateProduct from "@/components/CreateProduct";
import ReadProductById from "@/components/ReadProductById";

export default function Manage() {
  return (
    <div className="flex flex-row">
    <CreateProduct />
    <ReadProductById />
    </div>
  );
}