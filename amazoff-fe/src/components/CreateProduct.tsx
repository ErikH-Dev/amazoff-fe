import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function CreateProduct() {
	return (
		<div className="flex flex-col gap-4 p-4 w-fit border border-gray-200 rounded-md">
			<h1 className="font-bold">Add product</h1>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="Name">Name</Label>
				<Input type="text" id="name" placeholder="Name" />
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="price">Price</Label>
				<Input type="number" id="price" placeholder="Price" step="0.01" />
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="description">Description</Label>
				<Input type="text" id="description" placeholder="Description" />
			</div>
			<Button>Create</Button>
		</div>
	)
}