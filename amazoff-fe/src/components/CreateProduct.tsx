import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateProduct() {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const handleCreateProduct = async () => {
        try {
            // await createProduct({
            //     name, price, description, vendor: ""
            // });
            alert("Product created successfully!");
        } catch {
            alert("Failed to create product.");
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 w-fit border border-gray-200 rounded-md">
            <h1 className="font-bold">Add product</h1>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                    type="number"
                    id="price"
                    placeholder="Price"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                    type="text"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <Button onClick={handleCreateProduct}>Create</Button>
        </div>
    );
}