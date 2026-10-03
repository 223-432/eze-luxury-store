import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../contexts/cartContext';
import { useStore } from '../contexts/storeContext';

export const money = value => `£${Number(value || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const AnalyticsBar = styled.div`
  height: ${({ $height }) => `${$height}px`};
  width: min(38px, 70%);
  min-height: 4px;
  background: linear-gradient(${({ theme }) => theme.colors.goldLight}, ${({ theme }) => theme.colors.primary});
`;

export const ProductCard = ({ product }) => {
  const { addProduct, cartItems } = useContext(CartContext);
  const { isWishlisted, toggleWishlist, categories } = useStore();
  const inCart = cartItems.find(item => item.id === product.id);
  const soldOut = product.stock !== undefined && product.stock <= 0;
  const maxed = Boolean(inCart && product.stock !== undefined && (inCart.quantity || 1) >= product.stock);
  const category = categories.find(item => String(item.id) === String(product.categoryId));

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image">
        <img src={`/IMAGES/${product.image}`} alt={product.name} loading="lazy" />
        <span className={soldOut ? 'stock-tag sold-out' : 'stock-tag'}>{soldOut ? 'Sold out' : 'In stock'}</span>
      </Link>
      <button type="button" className={`heart-button${isWishlisted(product.id) ? ' active' : ''}`} aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => toggleWishlist(product)}>♡</button>
      <div className="product-info">
        <span className="eyebrow">{category?.name || 'EZE.B collection'}</span>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
        <span className="product-rating" aria-label="Rated 4.8 out of 5">★★★★★ <small>4.8</small></span>
        <strong>{money(product.price)}</strong>
        <button className="button button-outline add-card-button" type="button" disabled={soldOut || maxed} onClick={() => addProduct(product)}>{soldOut ? 'Unavailable' : maxed ? 'Maximum in bag' : inCart ? 'Add another' : 'Add to bag'}</button>
      </div>
    </article>
  );
};

export const ProductGrid = ({ products, empty = 'No pieces found.', loading = false, error = '' }) => (
  loading ? <div className="product-grid" aria-label="Loading products">{[1, 2, 3, 4].map(item => <div className="skeleton-card" key={item}><div className="skeleton-image" /><div className="skeleton-line" /><div className="skeleton-line short" /></div>)}</div> : error ? <div className="error-state" role="alert">We couldn’t load the collection: {error}</div> : products.length ? <div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><span className="empty-mark">E</span><h2>{empty}</h2><p>Try adjusting your selection or browse the full collection.</p><Link className="button button-primary" to="/products">Explore collection</Link></div>
);

export const CatalogPage = () => {
  const { products, categories, catalogLoading, catalogError } = useStore();
  const { categoryId } = useParams();
  const [sort, setSort] = useState('featured');
  const [minimum, setMinimum] = useState('');
  const [maximum, setMaximum] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const category = categories.find(item => String(item.id) === String(categoryId));
  const visibleProducts = useMemo(() => products
    .filter(item => !categoryId || String(item.categoryId) === String(categoryId))
    .filter(item => minimum === '' || Number(item.price) >= Number(minimum))
    .filter(item => maximum === '' || Number(item.price) <= Number(maximum))
    .filter(item => stockFilter === 'all' || (stockFilter === 'available' ? item.stock > 0 : item.stock <= 0))
    .sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'name' ? a.name.localeCompare(b.name) : 0), [products, categoryId, minimum, maximum, sort, stockFilter]);

  return <div className="content-wrap">
    <div className="page-heading"><span className="eyebrow">The EZE.B collection</span><h1>{category ? category.name : 'Discover the collection'}</h1><p>Exceptional objects, selected for a life well lived.</p></div>
    <div className="catalog-controls"><span>{visibleProducts.length} pieces</span><label>Min price <input aria-label="Minimum price" type="number" min="0" placeholder="No limit" value={minimum} onChange={event => setMinimum(event.target.value)} /></label><label>Max price <input aria-label="Maximum price" type="number" min="0" placeholder="No limit" value={maximum} onChange={event => setMaximum(event.target.value)} /></label><label>Availability <select value={stockFilter} onChange={event => setStockFilter(event.target.value)}><option value="all">All pieces</option><option value="available">In stock</option><option value="sold-out">Sold out</option></select></label><label>Sort by <select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></label></div>
    <ProductGrid products={visibleProducts} loading={catalogLoading} error={catalogError} />
  </div>;
};

export const SearchResultsPage = () => {
  const { products, categories, catalogLoading, catalogError } = useStore();
  const [params, setParams] = useSearchParams();
  const query = params.get('s') || '';
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return products.filter(product => [product.name, product.description, categories.find(category => String(category.id) === String(product.categoryId))?.name].some(value => (value || '').toLowerCase().includes(normalized)));
  }, [products, categories, query]);
  return <div className="content-wrap">
    <div className="page-heading"><span className="eyebrow">Search the collection</span><h1>Search results</h1></div>
    <form className="search-page-form" onSubmit={event => event.preventDefault()}><input autoFocus aria-label="Search products" value={query} onChange={event => setParams(event.target.value ? { s: event.target.value } : {}, { replace: true })} placeholder="Name, category or description" />{query && <button className="button button-outline" type="button" onClick={() => setParams({}, { replace: true })}>Clear search</button>}</form>
    <p className="results-count">{query ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${query}”` : 'Enter a search term to discover a piece.'}</p>
    <ProductGrid products={results} empty="No pieces match your search." loading={catalogLoading} error={catalogError} />
  </div>;
};

export const ProductDetailsPage = () => {
  const { products, showToast, user } = useStore();
  const { productId } = useParams();
  const { addProduct, cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const product = products.find(item => String(item.id) === productId);
  const reviewsKey = `eze-reviews-${productId}`;
  const cartQuantity = cartItems.find(item => String(item.id) === productId)?.quantity || 0;
  const availableStock = product?.stock === undefined ? Infinity : Math.max(0, product.stock - cartQuantity);
  const [reviews, setReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem(reviewsKey)) || []; } catch (error) { console.error('Unable to read product reviews.', error); return []; }
  });
  useEffect(() => {
    try { setReviews(JSON.parse(localStorage.getItem(reviewsKey)) || []); } catch (error) { console.error('Unable to read product reviews.', error); setReviews([]); }
  }, [reviewsKey]);
  useEffect(() => { setSelectedImage(product?.image || ''); setQuantity(1); }, [product?.id, product?.image]);
  useEffect(() => {
    if (!product) return;
    try {
      const recent = JSON.parse(localStorage.getItem('eze-recently-viewed')) || [];
      if (!recent.includes(product.id)) localStorage.setItem('eze-recently-viewed', JSON.stringify([product.id, ...recent].slice(0, 8)));
    } catch (error) {
      console.error('Unable to update recently viewed products.', error);
    }
  }, [product]);

  if (!product) return <div className="content-wrap"><div className="empty-state"><h1>Piece not found</h1><Link className="button button-primary" to="/products">Browse collection</Link></div></div>;

  const related = products.filter(item => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4);
  const rating = reviews.length
    ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1)
    : Number(product.rating || 4.8).toFixed(1);
  const submitReview = event => {
    event.preventDefault();
    if (reviewText.trim().length < 5) return showToast('Please add a review of at least five characters.', 'error');
    const next = [{ id: Date.now(), name: user?.name || 'Guest', rating: Number(reviewRating), comment: reviewText.trim(), date: new Date().toISOString() }, ...reviews];
    setReviews(next);
    localStorage.setItem(reviewsKey, JSON.stringify(next));
    setReviewText('');
    showToast('Thank you for sharing your review.');
  };

  return <div className="content-wrap">
    <div className="breadcrumbs"><Link to="/">Home</Link> / <Link to={`/categories/${product.categoryId}`}>{categoriesName(product.categoryId)}</Link> / {product.name}</div>
    <div className="detail-layout">
      <div className="detail-gallery"><div className="detail-main-image"><img src={`/IMAGES/${selectedImage || product.image}`} alt={product.name} /></div><div className="gallery-thumbs">{[product.image, ...(product.gallery || [])].map((image, index) => <button className={selectedImage === image ? 'active' : ''} type="button" key={`${image}-${index}`} aria-label={`View ${product.name} image ${index + 1}`} onClick={() => setSelectedImage(image)}><img src={`/IMAGES/${image}`} alt="" /></button>)}</div></div>
      <section className="detail-copy"><span className="eyebrow">{categoriesName(product.categoryId)} · EZE.B EDITION</span><h1>{product.name}</h1><span className="product-rating">{'★'.repeat(Math.round(Number(rating)))}{'☆'.repeat(5 - Math.round(Number(rating)))} <small>{rating} · {reviews.length} reviews</small></span><strong className="detail-price">{money(product.price)}</strong><p>{product.description}</p><p className={product.stock > 0 ? 'stock-copy' : 'out-copy'}>{product.stock > 0 ? `In stock · ${product.stock} available` : 'Currently unavailable'}</p>
        <div className="quantity-picker"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(current => Math.max(1, current - 1))}>−</button><span>{quantity}</span><button type="button" aria-label="Increase quantity" disabled={quantity >= availableStock} onClick={() => setQuantity(current => Math.min(availableStock, current + 1))}>+</button></div>
        <div className="detail-actions"><button className="button button-primary" disabled={availableStock <= 0} onClick={() => addProduct(product, quantity)}>Add to bag</button><button className="button button-outline" disabled={availableStock <= 0} onClick={() => { addProduct(product, quantity); navigate('/checkout'); }}>Buy now</button><WishlistButton product={product} /></div>
        <div className="detail-specs"><h3>Details & specifications</h3><p>{product.specs?.dimensions && <><b>Dimensions</b> {product.specs.dimensions}<br /></>}{product.specs?.capacity && <><b>Capacity</b> {product.specs.capacity}<br /></>}</p><ul>{(product.features || []).map(feature => <li key={feature}>{feature}</li>)}</ul></div>
      </section>
    </div>
    <section className="reviews-section"><div className="section-title"><div><span className="eyebrow">From our community</span><h2>Client reviews</h2></div></div><form className="review-form" onSubmit={submitReview}><label>Your rating <select value={reviewRating} onChange={event => setReviewRating(event.target.value)}>{[5, 4, 3, 2, 1].map(value => <option key={value} value={value}>{value} stars</option>)}</select></label><textarea aria-label="Your review" value={reviewText} onChange={event => setReviewText(event.target.value)} placeholder="Share your experience with this piece" rows="3" /><button className="button button-outline">Submit review</button></form>{reviews.length ? reviews.map(review => <div className="review-item" key={review.id}><span className="product-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span><p>{review.comment}</p><small>{review.name} · {new Date(review.date).toLocaleDateString()}</small></div>) : <p className="muted">There are no reviews yet. Be the first to share your experience.</p>}</section>
    <section className="related-section"><div className="section-title"><div><span className="eyebrow">Selected for you</span><h2>Related pieces</h2></div></div><ProductGrid products={related} /></section>
  </div>;
};

const categoriesName = id => {
  const names = ['Cars', 'Watches', 'Fragrance'];
  return names[Number(id)] || 'Collection';
};

export const WishlistButton = ({ product }) => {
  const { isWishlisted, toggleWishlist } = useStore();
  return <button className={`button button-outline wishlist-action${isWishlisted(product.id) ? ' active' : ''}`} type="button" onClick={() => toggleWishlist(product)}>{isWishlisted(product.id) ? '♥ Saved' : '♡ Save'}</button>;
};

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useStore();
  const { addProduct } = useContext(CartContext);
  return <div className="content-wrap"><div className="page-heading"><span className="eyebrow">Your private edit</span><h1>Wishlist</h1><p>Pieces you’ve saved for another moment.</p></div>{wishlist.length ? <div className="product-grid">{wishlist.map(product => <article className="product-card" key={product.id}><Link to={`/products/${product.id}`} className="product-image"><img src={`/IMAGES/${product.image}`} alt={product.name} /></Link><div className="product-info"><span className="eyebrow">{categoriesName(product.categoryId)}</span><Link className="product-name" to={`/products/${product.id}`}>{product.name}</Link><strong>{money(product.price)}</strong><button className="button button-primary" disabled={product.stock === 0} onClick={() => { if (addProduct(product)) removeFromWishlist(product.id); }}>{product.stock === 0 ? 'Unavailable' : 'Move to cart'}</button><button className="text-button" onClick={() => removeFromWishlist(product.id)}>Remove</button></div></article>)}</div> : <div className="empty-state"><span className="empty-mark">♡</span><h2>Your wishlist is waiting</h2><p>Save the pieces you love and find them here.</p><Link className="button button-primary" to="/products">Explore collection</Link></div>}</div>;
};

export const AccountPage = () => {
  const { user, updateProfile, logout, orders } = useStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const userOrders = orders.filter(order => order.customer?.email === user?.email);
  const save = event => { event.preventDefault(); if (!name.trim()) return; updateProfile({ name: name.trim(), phone: phone.trim() }); setEditing(false); };
  return <div className="content-wrap account-layout"><aside className="account-menu"><span className="eyebrow">My EZE.B</span><h2>Account</h2><Link to="/profile">Profile</Link><Link to="/orders">Orders <span>{userOrders.length}</span></Link><Link to="/wishlist">Wishlist</Link>{user?.role === 'admin' && <Link to="/admin">Admin dashboard</Link>}<button className="text-button" onClick={logout}>Sign out</button></aside><section className="account-panel"><span className="eyebrow">Personal details</span><div className="section-title"><h1>Welcome, {user?.name}</h1><button className="button button-outline" onClick={() => setEditing(value => !value)}>{editing ? 'Cancel' : 'Edit profile'}</button></div>{editing ? <form className="form-card" onSubmit={save}><label>Full name<input required value={name} onChange={event => setName(event.target.value)} /></label><label>Email<input type="email" value={user?.email} disabled /></label><label>Phone number<input value={phone} onChange={event => setPhone(event.target.value)} /></label><button className="button button-primary">Save profile</button></form> : <div className="info-card"><p><b>Name</b>{user?.name}</p><p><b>Email</b>{user?.email}</p><p><b>Phone</b>{user?.phone || 'Not provided'}</p></div>}<div className="section-title"><h2>Recent orders</h2><Link to="/orders">View all</Link></div>{userOrders.slice(0, 3).map(order => <OrderCard key={order.id} order={order} />)}{!userOrders.length && <p className="muted">Your orders will appear here when you place one.</p>}</section></div>;
};

const OrderCard = ({ order }) => <Link className="order-card" to={`/orders/${order.id}`}><div><strong>{order.id}</strong><small>{new Date(order.date).toLocaleDateString()}</small></div><span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span><span className="status-pill">{order.status}</span><strong>{money(order.total)}</strong></Link>;

export const OrdersPage = () => {
  const { orders, user } = useStore();
  const mine = orders.filter(order => order.customer?.email === user?.email);
  return <div className="content-wrap"><div className="page-heading"><span className="eyebrow">Your EZE.B history</span><h1>Orders</h1><p>Order history and delivery updates.</p></div>{mine.length ? <div className="order-list">{mine.map(order => <OrderCard key={order.id} order={order} />)}</div> : <div className="empty-state"><h2>No orders yet</h2><p>Discover a piece to begin your collection.</p><Link className="button button-primary" to="/products">Shop collection</Link></div>}</div>;
};

export const OrderDetailsPage = () => {
  const { orders, user } = useStore();
  const { orderId } = useParams();
  const order = orders.find(item => item.id === orderId && (item.customer?.email === user?.email || user?.role === 'admin'));
  if (!order) return <div className="content-wrap"><div className="empty-state"><h1>Order not found</h1><Link to="/orders">Return to orders</Link></div></div>;
  return <div className="content-wrap"><div className="page-heading"><span className="eyebrow">Order details</span><h1>{order.id}</h1><p>Placed {new Date(order.date).toLocaleString()} · <span className="status-pill">{order.status}</span></p></div><div className="checkout-layout"><div className="form-card"><h2>Items</h2>{order.items.map(item => <div className="summary-line" key={item.id}><span>{item.name} × {item.quantity}</span><strong>{money(item.price * item.quantity)}</strong></div>)}<hr /><div className="summary-line"><span>Subtotal</span><span>{money(order.subtotal)}</span></div><div className="summary-line"><span>Shipping ({order.delivery?.type})</span><span>{money(order.shipping)}</span></div><div className="summary-line total-line"><b>Total</b><b>{money(order.total)}</b></div></div><div className="form-card"><h2>Delivery details</h2><p>{order.customer?.name}<br />{order.customer?.email}<br />{order.customer?.phone}</p><p>{order.address?.address}<br />{order.address?.city}, {order.address?.state}<br />{order.address?.country}</p><p>{order.delivery?.type} delivery</p></div></div><Link className="button button-outline back-link" to="/orders">Back to orders</Link></div>;
};

const CheckoutSteps = ['Customer', 'Address', 'Delivery', 'Payment'];
export const CheckoutPage = () => {
  const { cartItems, clearBasket, discountCode, clearDiscount } = useContext(CartContext);
  const { user, placeOrder, showToast } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState('Standard');
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: '', city: '', state: '', country: '' });
  const [payment, setPayment] = useState({ cardholder: '', cardNumber: '', expiry: '', cvv: '' });
  const [showCvv, setShowCvv] = useState(false);
  const subtotal = cartItems.reduce((total, item) => total + Number(item.price) * (item.quantity || 1), 0);
  const shipping = delivery === 'Express' ? 80 : 25;
  const discount = discountCode ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;
  const update = (setter, event) => setter(current => ({ ...current, [event.target.name]: event.target.value }));

  const next = event => {
    event.preventDefault();
    const required = step === 0 ? ['name', 'email', 'phone'] : step === 1 ? ['address', 'city', 'state', 'country'] : [];
    const missing = required.some(key => !form[key].trim());
    if (missing) return showToast('Please complete all required fields before continuing.', 'error');
    if (step === 3) {
      const cardDigits = payment.cardNumber.replace(/\D/g, '');
      if (!payment.cardholder.trim() || cardDigits.length < 12 || !/^\d{2}\/\d{2}$/.test(payment.expiry) || payment.cvv.replace(/\D/g, '').length < 3) return showToast('Enter valid demo card details to continue.', 'error');
      const savedOrder = placeOrder({
        customer: { name: form.name, email: form.email, phone: form.phone },
        address: { address: form.address, city: form.city, state: form.state, country: form.country },
        delivery: { type: delivery }, items: cartItems.map(item => ({ ...item })),
        subtotal, shipping, discount, total
      });
      clearBasket();
      clearDiscount();
      navigate(`/order-confirmation?order=${encodeURIComponent(savedOrder.id)}`);
      return;
    }
    setStep(current => current + 1);
  };

  if (!cartItems.length) return <div className="content-wrap"><div className="empty-state"><h1>Your bag is empty</h1><Link className="button button-primary" to="/products">Explore collection</Link></div></div>;
  return <div className="content-wrap"><div className="page-heading"><span className="eyebrow">A considered purchase</span><h1>Secure checkout</h1><p>Payments are for demonstration only. No real payment will be processed.</p></div><div className="stepper">{CheckoutSteps.map((title, index) => <div key={title} className={index <= step ? 'step active' : 'step'}><span>{index + 1}</span>{title}</div>)}</div><div className="checkout-layout"><form className="form-card" onSubmit={next}>
    {step === 0 && <><h2>Customer information</h2><label>Full name<input name="name" autoComplete="name" value={form.name} onChange={event => update(setForm, event)} required /></label><label>Email address<input name="email" type="email" autoComplete="email" value={form.email} onChange={event => update(setForm, event)} required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={event => update(setForm, event)} required /></label></>}
    {step === 1 && <><h2>Shipping address</h2><label>Address<input name="address" autoComplete="street-address" value={form.address} onChange={event => update(setForm, event)} required /></label><label>City<input name="city" autoComplete="address-level2" value={form.city} onChange={event => update(setForm, event)} required /></label><div className="form-row"><label>State / region<input name="state" value={form.state} onChange={event => update(setForm, event)} required /></label><label>Country<input name="country" autoComplete="country-name" value={form.country} onChange={event => update(setForm, event)} required /></label></div></>}
    {step === 2 && <><h2>Choose delivery</h2><label className="choice-card"><input type="radio" name="delivery" checked={delivery === 'Standard'} onChange={() => setDelivery('Standard')} /><span><b>Standard insured delivery</b><small>Complimentary concierge tracking · 3–5 business days</small></span><b>£25.00</b></label><label className="choice-card"><input type="radio" name="delivery" checked={delivery === 'Express'} onChange={() => setDelivery('Express')} /><span><b>Express delivery</b><small>Priority handling · 1–2 business days</small></span><b>£80.00</b></label></>}
    {step === 3 && <><h2>Payment details</h2><p className="muted">Frontend demo only — card details are not stored or submitted.</p><label>Cardholder name<input autoComplete="cc-name" value={payment.cardholder} onChange={event => update(setPayment, { target: { name: 'cardholder', value: event.target.value } })} required /></label><label>Card number<input autoComplete="cc-number" inputMode="numeric" maxLength="23" value={payment.cardNumber} onChange={event => update(setPayment, { target: { name: 'cardNumber', value: event.target.value.replace(/[^\d ]/g, '') } })} placeholder="1234 5678 9012 3456" required /></label><div className="form-row"><label>Expiry date<input autoComplete="cc-exp" maxLength="5" placeholder="MM/YY" value={payment.expiry} onChange={event => update(setPayment, { target: { name: 'expiry', value: event.target.value.replace(/[^\d/]/g, '') } })} required /></label><label>CVV<span className="password-field"><input autoComplete="cc-csc" type={showCvv ? 'text' : 'password'} maxLength="4" value={payment.cvv} onChange={event => update(setPayment, { target: { name: 'cvv', value: event.target.value.replace(/\D/g, '') } })} required /><button type="button" onClick={() => setShowCvv(value => !value)}>{showCvv ? 'Hide' : 'Show'}</button></span></label></div></>}
    <div className="form-actions">{step > 0 && <button type="button" className="button button-outline" onClick={() => setStep(current => current - 1)}>Back</button>}<button className="button button-primary">{step === 3 ? 'Place demo order' : 'Continue'}</button></div>
  </form><aside className="form-card order-summary"><h2>Order summary</h2>{cartItems.map(item => <div className="summary-line" key={item.id}><span>{item.name} × {item.quantity || 1}</span><span>{money(item.price * (item.quantity || 1))}</span></div>)}<hr /><div className="summary-line"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="summary-line"><span>Shipping</span><span>{money(shipping)}</span></div><div className="summary-line"><span>Discount</span><span>−{money(discount)}</span></div><div className="summary-line total-line"><b>Total</b><b>{money(total)}</b></div></aside></div></div>;
};

export const OrderConfirmationPage = () => {
  const { orders, user } = useStore();
  const { orderId: pathOrderId } = useParams();
  const [params] = useSearchParams();
  const orderId = pathOrderId || params.get('order');
  const order = orders.find(item => item.id === orderId && item.customer?.email === user?.email);
  if (!order) return <div className="content-wrap"><div className="empty-state"><h1>Order unavailable</h1><Link to="/orders">View your orders</Link></div></div>;
  return <div className="content-wrap"><div className="confirmation-card"><span className="confirmation-check">✓</span><span className="eyebrow">Thank you for choosing EZE.B</span><h1>Your order is confirmed</h1><p>Order <b>{order.id}</b> · {new Date(order.date).toLocaleDateString()}</p><p>A confirmation for your order has been prepared for {order.customer.email}.</p><div className="confirmation-summary">{order.items.map(item => <div className="summary-line" key={item.id}><span>{item.name} × {item.quantity}</span><span>{money(item.price * item.quantity)}</span></div>)}<hr /><div className="summary-line"><span>{order.delivery.type} delivery</span><span>{money(order.shipping)}</span></div><div className="summary-line total-line"><b>Total</b><b>{money(order.total)}</b></div><p>{order.customer.name}<br />{order.address.address}, {order.address.city}, {order.address.state}, {order.address.country}</p></div><div className="form-actions"><Link className="button button-outline" to="/products">Continue shopping</Link><Link className="button button-primary" to={`/orders/${order.id}`}>View order</Link></div><small>This is a frontend demonstration. No payment was processed.</small></div></div>;
};

export const LoginPage = () => {
  const { login, showToast } = useStore();
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const submit = async event => { event.preventDefault(); const result = await login(form.email, form.password); if (!result.ok) return setError(result.error); showToast('Welcome back.'); navigate(location.state?.from?.pathname || params.get('from') || '/profile', { replace: true }); };
  return <AuthForm title="Welcome back" eyebrow="Your EZE.B account" submit={submit} error={error} footer={<>New to EZE.B? <Link to="/register">Create an account</Link></>}><label>Email<input type="email" autoComplete="email" required value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} /></label><label>Password<span className="password-field"><input type={visible ? 'text' : 'password'} autoComplete="current-password" required value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} /><button type="button" onClick={() => setVisible(value => !value)}>{visible ? 'Hide' : 'Show'}</button></span></label><small className="muted">Admin demo: admin@eze.com / Admin123!</small></AuthForm>;
};

export const RegisterPage = () => {
  const { register, showToast } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const submit = async event => { event.preventDefault(); if (form.password.length < 8) return setError('Use a password with at least 8 characters.'); if (form.password !== form.confirm) return setError('Passwords do not match.'); const result = await register(form); if (!result.ok) return setError(result.error); showToast('Your account has been created.'); navigate('/profile'); };
  return <AuthForm title="Create your account" eyebrow="A more personal experience" submit={submit} error={error} footer={<>Already have an account? <Link to="/login">Sign in</Link></>}><label>Full name<input autoComplete="name" required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} /></label><label>Email<input type="email" autoComplete="email" required value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} /></label><label>Password<span className="password-field"><input type={visible ? 'text' : 'password'} autoComplete="new-password" minLength="8" required value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} /><button type="button" onClick={() => setVisible(value => !value)}>{visible ? 'Hide' : 'Show'}</button></span></label><label>Confirm password<input type={visible ? 'text' : 'password'} required value={form.confirm} onChange={event => setForm({ ...form, confirm: event.target.value })} /></label></AuthForm>;
};

const AuthForm = ({ title, eyebrow, submit, error, footer, children }) => <div className="content-wrap auth-wrap"><form className="form-card auth-card" onSubmit={submit}><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{error && <p className="form-error" role="alert">{error}</p>}{children}<button className="button button-primary">Continue</button><p className="auth-footer">{footer}</p><small className="muted">Demo storefront account. Do not reuse real passwords.</small></form></div>;

export const AdminPage = ({ section = 'overview' }) => {
  const { products, orders, users, categories, saveProduct, deleteProduct, updateOrderStatus } = useStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [editing, setEditing] = useState(null);
  const sales = orders.filter(order => order.status !== 'Cancelled').reduce((sum, order) => sum + order.total, 0);
  const filtered = products.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) && (category === 'all' || String(item.categoryId) === category));
  const setField = (key, value) => setEditing(current => ({ ...current, [key]: value }));
  const save = event => { event.preventDefault(); saveProduct({ ...editing, price: Number(editing.price), stock: Number(editing.stock), categoryId: Number(editing.categoryId), specs: editing.specs || {}, features: editing.features || [] }); setEditing(null); };
  const beginCreate = () => setEditing({ name: '', description: '', image: 'watches 1.jpg', price: '', stock: 1, categoryId: 1 });
  const nav = <nav className="admin-nav"><Link to="/admin">Overview</Link><Link to="/admin/products">Products</Link><Link to="/admin/orders">Orders</Link><Link to="/admin/customers">Customers</Link><Link to="/admin/analytics">Analytics</Link></nav>;
  const heading = { overview: 'Overview', products: 'Product management', orders: 'Order management', customers: 'Customer directory', analytics: 'Analytics' }[section];
  return <div className="content-wrap admin-page"><div className="page-heading"><span className="eyebrow">EZE.B · private workspace</span><h1>{heading}</h1></div>{nav}
    {section === 'overview' && <><div className="metrics-grid">{[['Total sales', money(sales)], ['Total orders', orders.length], ['Total customers', users.length], ['Total products', products.length], ['Low stock', products.filter(item => item.stock <= 3).length]].map(([label, value]) => <div className="metric-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="form-card"><h2>Recent orders</h2>{orders.slice(0, 5).map(order => <OrderCard key={order.id} order={order} />)}{!orders.length && <p className="muted">Orders will appear here after checkout.</p>}</div></>}
    {section === 'products' && <><div className="admin-toolbar"><input aria-label="Search products" placeholder="Search products" value={query} onChange={event => setQuery(event.target.value)} /><select aria-label="Filter by category" value={category} onChange={event => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button className="button button-primary" onClick={beginCreate}>Add product</button></div>{editing && <form className="form-card admin-edit-form" onSubmit={save}><h2>{products.some(item => item.id === editing.id) ? 'Edit product' : 'New product'}</h2><label>Name<input required value={editing.name} onChange={event => setField('name', event.target.value)} /></label><label>Description<textarea required value={editing.description} onChange={event => setField('description', event.target.value)} /></label><div className="form-row"><label>Category<select value={editing.categoryId} onChange={event => setField('categoryId', event.target.value)}>{categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label>Image filename<input required value={editing.image} onChange={event => setField('image', event.target.value)} /></label></div><div className="form-row"><label>Price<input type="number" min="0" required value={editing.price} onChange={event => setField('price', event.target.value)} /></label><label>Stock<input type="number" min="0" required value={editing.stock} onChange={event => setField('stock', event.target.value)} /></label></div><div className="form-actions"><button className="button button-primary">Save product</button><button type="button" className="button button-outline" onClick={() => setEditing(null)}>Cancel</button></div></form>}<div className="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>{filtered.map(item => <tr key={item.id}><td>{item.name}</td><td>{categoriesName(item.categoryId)}</td><td>{money(item.price)}</td><td className={item.stock <= 3 ? 'low-stock' : ''}>{item.stock}</td><td><button className="text-button" onClick={() => setEditing({ ...item })}>Edit</button><button className="text-button danger-text" onClick={() => { if (window.confirm(`Delete ${item.name}?`)) deleteProduct(item.id); }}>Delete</button></td></tr>)}</tbody></table></div></>}
    {section === 'orders' && <div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Details</th></tr></thead><tbody>{orders.map(order => <tr key={order.id}><td>{order.id}</td><td>{order.customer.name}<small>{order.customer.email}</small></td><td>{new Date(order.date).toLocaleDateString()}</td><td>{money(order.total)}</td><td><select value={order.status} onChange={event => updateOrderStatus(order.id, event.target.value)}>{['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => <option key={status}>{status}</option>)}</select></td><td><Link to={`/orders/${order.id}`}>View</Link></td></tr>)}</tbody></table>{!orders.length && <p className="muted">No orders yet.</p>}</div>}
    {section === 'customers' && <div className="table-wrap"><table><thead><tr><th>Customer</th><th>Email</th><th>Orders</th><th>Lifetime value</th></tr></thead><tbody>{users.map(customer => { const customerOrders = orders.filter(order => order.customer.email === customer.email); return <tr key={customer.email}><td>{customer.name}</td><td>{customer.email}</td><td>{customerOrders.length}</td><td>{money(customerOrders.reduce((sum, order) => sum + order.total, 0))}</td></tr>; })}</tbody></table>{!users.length && <p className="muted">Customer profiles will appear here when accounts are created.</p>}</div>}
    {section === 'analytics' && <Analytics orders={orders} products={products} />}
  </div>;
};

const Analytics = ({ orders, products }) => {
  const completed = orders.filter(order => order.status !== 'Cancelled');
  const daily = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(); date.setDate(date.getDate() - (6 - index));
    const matching = completed.filter(order => new Date(order.date).toDateString() === date.toDateString());
    return { label: date.toLocaleDateString(undefined, { weekday: 'short' }), orders: matching.length, sales: matching.reduce((sum, order) => sum + order.total, 0) };
  });
  const maxSales = Math.max(1, ...daily.map(item => item.sales));
  const popular = [...products].map(product => ({ ...product, quantity: completed.flatMap(order => order.items).filter(item => item.id === product.id).reduce((sum, item) => sum + item.quantity, 0) })).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
  return <div className="analytics-grid"><div className="form-card chart-card"><h2>Sales & revenue · last 7 days</h2><div className="bar-chart">{daily.map(day => <div className="bar-column" key={day.label}><span>{money(day.sales)}</span><AnalyticsBar $height={Math.max(4, day.sales / maxSales * 150)} /><small>{day.label}</small></div>)}</div></div><div className="form-card"><h2>Orders per day</h2>{daily.map(day => <div className="summary-line" key={day.label}><span>{day.label}</span><b>{day.orders} orders</b></div>)}</div><div className="form-card"><h2>Popular products</h2>{popular.map(product => <div className="summary-line" key={product.id}><span>{product.name}</span><b>{product.quantity} sold</b></div>)}</div></div>;
};
