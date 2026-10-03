import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../pages/StorePages';
import { useStore } from '../contexts/storeContext';

const Home = () => {
  const { products, categories, orders, catalogLoading, catalogError, showToast } = useStore();
  const [email, setEmail] = useState('');
  const featured = products.slice(0, 4);
  const newArrivals = [...products].sort((a, b) => b.id - a.id).slice(0, 4);
  const soldCounts = new Map();
  orders.forEach(order => order.items.forEach(item => soldCounts.set(item.id, (soldCounts.get(item.id) || 0) + item.quantity)));
  const bestSellers = [...products].sort((a, b) => {
    const salesDifference = (soldCounts.get(b.id) || 0) - (soldCounts.get(a.id) || 0);
    return salesDifference || a.stock - b.stock;
  }).slice(0, 4);
  let recentlyViewed = [];
  try {
    const ids = JSON.parse(localStorage.getItem('eze-recently-viewed')) || [];
    recentlyViewed = ids.map(id => products.find(product => product.id === id)).filter(Boolean).slice(0, 4);
  } catch (error) {
    console.error('Unable to load recently viewed pieces.', error);
  }
  const subscribe = event => {
    event.preventDefault();
    const subscribers = (() => {
      try { return JSON.parse(localStorage.getItem('eze-newsletter')) || []; } catch (error) { console.error('Unable to load newsletter subscriptions.', error); return []; }
    })();
    if (!subscribers.includes(email.toLowerCase())) localStorage.setItem('eze-newsletter', JSON.stringify([...subscribers, email.toLowerCase()]));
    setEmail('');
    showToast('You’re on the list. Look out for a note from EZE.B.');
  };
  const categoryImages = ['cars 1.jpg', 'watches 1.jpg', 'fragrance 1.jpg'];

  return <div className="home-page">
    <section className="hero">
      <div className="hero-content"><span className="hero-mark">EZE.B</span><span className="eyebrow">A modern house of distinction</span><h1>Luxury Without<br />Compromise</h1><p>An uncompromising edit of exceptional automobiles, timepieces and fragrance.</p><Link className="button button-gold" to="/products">Shop Collection <span>↗</span></Link></div>
      <div className="hero-caption">OBJECTS OF DESIRE · EST. 2024</div>
    </section>
    <section className="home-section content-wrap"><div className="section-title"><div><span className="eyebrow">Three worlds, one point of view</span><h2>Explore the collections</h2></div><Link to="/products">View all pieces ↗</Link></div><div className="category-grid">{categories.map((category, index) => <Link className="category-tile" key={category.id} to={`/categories/${category.id}`}><img src={`/IMAGES/${categoryImages[index]}`} alt="" /><span className="category-shade" /><div><span className="eyebrow">The collection</span><h3>{category.name}</h3><span>Discover the edit ↗</span></div></Link>)}</div></section>
    <section className="home-section content-wrap"><div className="section-title"><div><span className="eyebrow">The house recommends</span><h2>Featured pieces</h2></div><Link to="/products">Explore all ↗</Link></div><ProductGrid products={featured} loading={catalogLoading} error={catalogError} /></section>
    <section className="luxury-banner"><div><span className="eyebrow">The art of the exceptional</span><h2>Made for the moments<br />that matter.</h2><p>Considered craft. Enduring design. A legacy in every detail.</p><Link className="button button-gold" to="/categories/1">Discover the edit</Link></div></section>
    <section className="home-section content-wrap"><div className="section-title"><div><span className="eyebrow">Just arrived</span><h2>New arrivals</h2></div><Link to="/products">View collection ↗</Link></div><ProductGrid products={newArrivals} loading={catalogLoading} error={catalogError} /></section>
    <section className="home-section content-wrap"><div className="section-title"><div><span className="eyebrow">House favourites</span><h2>Best sellers</h2></div></div><ProductGrid products={bestSellers} loading={catalogLoading} error={catalogError} /></section>
    {recentlyViewed.length > 0 && <section className="home-section content-wrap"><div className="section-title"><div><span className="eyebrow">A second look</span><h2>Recently viewed</h2></div></div><ProductGrid products={recentlyViewed} /></section>}
    <section className="newsletter"><span className="eyebrow">The EZE.B letter</span><h2>A more considered inbox.</h2><p>Receive rare discoveries, private invitations and notes from the house.</p><form onSubmit={subscribe}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" value={email} onChange={event => setEmail(event.target.value)} /><button className="button button-gold">Subscribe</button></form></section>
  </div>;
};

export default Home;
