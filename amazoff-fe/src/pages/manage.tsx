import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from "@/models/product";
import { addProduct, getProductsByVendorId, updateProduct } from "@/services/productService";
import ProductForm from "@/components/ProductForm";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import React, { useEffect, useState } from "react";

export default function Manage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProductsByVendorId().then(setProducts);
  }, []);

  const handleAddProduct = async (product: Product) => {
    await addProduct(product);
    setDialogOpen(false);
    setEditProduct(null);
    getProductsByVendorId().then(setProducts);
  };

  const handleUpdateProduct = async (product: Product) => {
    if (!editProduct) return;
    await updateProduct(product);
    setDialogOpen(false);
    setEditProduct(null);
    getProductsByVendorId().then(setProducts);
  };

  const openAddDialog = () => {
    setEditProduct(null);
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditProduct(product);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="flex justify-right m-4">
        <Button className="ml-auto" onClick={openAddDialog}>
          Create Product
        </Button>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) setEditProduct(null);
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {editProduct ? "Edit Product" : "Create Product"}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <ProductForm
            initialValues={editProduct ?? undefined}
            onSubmit={async (values) => {
              const product: Product = {
                ...(editProduct ?? {}),
                ...values,
              } as Product;
              if (editProduct) {
                await handleUpdateProduct(product);
              } else {
                await handleAddProduct(product);
              }
            }}
            submitLabel={editProduct ? "Update Product" : "Add Product"}
          />
          <AlertDialogCancel className="mt-4 w-full">Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
      <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right w-[100px]">Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="text-right w-[100px]">
                <Button onClick={() => openEditDialog(product)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}