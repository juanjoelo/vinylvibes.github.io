// src/pages/Checkout.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cart } = useContext(CartContext);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = async () => {
    // Aquí debes agregar tu lógica para manejar el pago con Mercado Pago.
    const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
      }),
    });

    const data = await response.json();

    // Redirigir al usuario a la URL de pago de Mercado Pago
    window.location.href = data.init_point;
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="checkout-items">
          {cart.map((item, index) => (
            <div key={index} className="checkout-item">
              <img
                src={item.image}
                alt={item.name}
                className="checkout-item-image"
              />
              <div className="checkout-item-details">
                <h3 className="checkout-item-name">{item.name}</h3>
                <p className="checkout-item-price">${item.price}</p>
                <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="checkout-total">
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            <button className="checkout-button" onClick={handlePayment}>
              Pay with Mercado Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
