import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getOrdersByUser } from "@/services/orderService";
import { Order } from "@/models/order";
import { OrderItem } from "@/models/orderitem";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrdersByUser().then(setOrders);
  }, []);

  return (
    <div className="p-4">
      <Table>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                {order.order_date instanceof Date
                  ? order.order_date.toLocaleString()
                  : new Date(order.order_date).toLocaleString()}
              </TableCell>
              <TableCell>${order.order_items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</TableCell>
              <TableCell>
                <Accordion type="single" collapsible>
                  <AccordionItem value={`order-${order.id}`}>
                    <AccordionTrigger>Show Items</AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.order_items.map((item: OrderItem, idx: number) => (
                            <TableRow key={idx}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>${item.price}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                            </TableRow> 
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    );
    }