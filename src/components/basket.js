import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/cartContext';
import { useStore } from '../contexts/storeContext';
import { money } from '../pages/StorePages';

const Basket = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeProduct, clearBasket, discountCode, applyDiscount } = useContext(CartContext);
  const { user } = useStore();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(discountCode);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const shipping = cartItems.length ? 25 : 0;
  const discount = discountCode ? subtotal * 0.1 : 0;

  return <div className="content-wrap">
    <div className="page-heading"><span className="eyebrow">Your selection</span><h1>Shopping bag</h1><p>{cartItems.length} {cartItems.length === 1 ? 'piece' : 'pieces'} selected</p></div>
    {!cartItems.length ? <div className="empty-state"><span className="empty-mark">E</span><h2>Your bag is empty</h2><p>Discover something exceptional.</p><Link className="button button-primary" to="/products">Explore collection</Link></div> : <div className="cart-layout">
      <div className="cart-items">{cartItems.map(item => <article className="cart-item" key={item.id}><Link to={`/products/${item.id}`} className="cart-image"><img src={`/IMAGES/${item.image}`} alt={item.name} /></Link><div className="cart-item-copy"><span className="eyebrow">EZE.B collection</span><Link className="product-name" to={`/products/${item.id}`}>{item.name}</Link><span>{money(item.price)}</span><small>{item.stock} available</small></div><div className="quantity-picker"><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => decreaseQuantity(item)}>−</button><span>{item.quantity || 1}</span><button type="button" aria-label={`Increase ${item.name} quantity`} disabled={item.stock !== undefined && item.quantity >= item.stock} onClick={() => increaseQuantity(item)}>+</button></div><strong>{money(item.price * (item.quantity || 1))}</strong><button className="text-button danger-text" onClick={() => removeProduct(item)}>Remove</button></article>)}
      <button className="text-button" onClick={clearBasket}>Clear bag</button></div>
      <aside className="form-card cart-summary"><h2>Summary</h2><div className="summary-line"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="summary-line"><span>Insured shipping</span><span>{money(shipping)}</span></div><form className="coupon-form" onSubmit={event => { event.preventDefault(); applyDiscount(coupon); }}><label htmlFor="coupon">Promotion code</label><div><input id="coupon" value={coupon} onChange={event => setCoupon(event.target.value)} placeholder="Enter code" /><button className="button button-outline">Apply</button></div><small>Use EZE10 for 10% off your pieces.</small></form><div className="summary-line"><span>Discount</span><span>−{money(discount)}</span></div><hr /><div className="summary-line total-line"><b>Total</b><b>{money(subtotal + shipping - discount)}</b></div><p className="muted">Final delivery options are selected at checkout.</p><button className="button button-primary" onClick={() => navigate(user ? '/checkout' : '/login?from=%2Fcheckout')}>Continue to checkout</button></aside>
    </div>}
  </div>;
};

export default Basket;
