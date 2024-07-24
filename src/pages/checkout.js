import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext.js";
import { useUser } from "../context/UserContext";
import "./checkout.css";
import { MagicMotion } from "react-magic-motion";

const provinces = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const { currentUser } = useUser();
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    document: "",
    country: "Argentina",
    address: "",
    floorDept: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });

  useEffect(() => {
    if (currentUser) {
      setShippingInfo({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        document: currentUser.document || "",
        country: currentUser.country || "Argentina",
        address: currentUser.address || "",
        floorDept: currentUser.floorDept || "",
        city: currentUser.city || "",
        province: currentUser.province || "",
        postalCode: currentUser.postalCode || "",
        phone: currentUser.phone || "",
        email: currentUser.email || "",
        additionalInfo: currentUser.additionalInfo || "",
      });
    }
  }, [currentUser]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handlePayment = async () => {
    // Aquí puedes agregar la lógica para manejar el pago
    console.log("Formulario de envío:", shippingInfo);
  };

  return (
    <MagicMotion>
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Tu carrito está vacío</p>
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
                  <p className="checkout-item-quantity">
                    Cantidad: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
            <div className="checkout-form">
              <h3>Datos de Envío</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="firstName">Nombre</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Apellido</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="document">Documento</label>
                  <input
                    type="text"
                    id="document"
                    name="document"
                    value={shippingInfo.document}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">País</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Dirección Completa</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="floorDept">Piso y Depto</label>
                  <input
                    type="text"
                    id="floorDept"
                    name="floorDept"
                    value={shippingInfo.floorDept}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">Localidad</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="province">Provincia</label>
                  <select
                    id="province"
                    name="province"
                    value={shippingInfo.province}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona una provincia</option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Código Postal</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Número de Teléfono</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="additionalInfo">Información Adicional</label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={shippingInfo.additionalInfo}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" onClick={handlePayment}>
                  Finalizar Compra
                </button>
              </form>
            </div>
            <div className="checkout-summary">
              <h3>Resumen</h3>
              <p>Total: ${getTotalPrice()}</p>
              {/* Aquí podrías agregar cualquier información adicional que necesites */}
            </div>
          </div>
        )}
      </div>
    </MagicMotion>
  );
};

export default Checkout;
