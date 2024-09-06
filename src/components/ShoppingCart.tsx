import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartConetxt";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
type ShoppingCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
            {cartItems.map(item => {
                return <CartItem key={item.id} {...item}/>
            })}
            <div className="ms-auto fw-bold fs-5">
                Total {formatCurrency(cartItems.reduce((total, currentItem) => {
                    const item = storeItems.find(item => item.id === currentItem.id);
                    return total + (item?.price || 0) * currentItem.quantity
                }, 0))}
            </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
