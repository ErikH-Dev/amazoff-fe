import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Max 100 characters"),
  price: z.number().positive("Price must be positive"),
  description: z.string().min(1, "Description is required").max(500, "Max 500 characters"),
  stock: z.number().int().positive("Stock must be positive").refine(val => val > 0, "Stock must be greater than 0"),
});

type ProductFormValues = z.infer<typeof formSchema>;

type ProductFormProps = {
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  submitLabel?: string;
};

export default function ProductForm({
  initialValues = {},
  onSubmit,
  submitLabel = "Submit",
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues.name || "",
      price: initialValues.price ?? 1,
      description: initialValues.description || "",
      stock: initialValues.stock ?? 1,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product name" {...field} />
              </FormControl>
              <FormDescription>Enter the product name (max 100 characters).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min={0}
                  {...field}
                  value={field.value ?? ""}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>Enter a positive price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Product description" {...field} />
              </FormControl>
              <FormDescription>Enter a description (max 500 characters).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  value={field.value ?? ""}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>Enter the available stock (must be greater than 0).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{submitLabel}</Button>
      </form>
    </Form>
  );
}