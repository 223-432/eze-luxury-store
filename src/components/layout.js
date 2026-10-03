import React, { useContext, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { CartContext } from '../contexts/cartContext';
import { useStore } from '../contexts/storeContext';
import Search from './search';

const Layout = () => {
  const { cartItems, notification, clearNotification } = useContext(CartContext);
  const { user, wishlist, toast, dismissToast, categories } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="announcement">Complimentary insured delivery on every order</div>
      <header className="site-header">
        <Link className="brand" to="/" onClick={closeMenu}><span>EZE</span><small>.B</small></Link>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>☰</button>
        <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          {(categories.length ? categories : [{ id: 0, name: 'Cars' }, { id: 1, name: 'Watches' }, { id: 2, name: 'Fragrance' }]).map(category =>
            <NavLink key={category.id} to={`/categories/${category.id}`} onClick={closeMenu}>{category.name}</NavLink>
          )}
          <NavLink to="/products" onClick={closeMenu}>Collection</NavLink>
        </nav>
        <div className="header-actions">
          <Search />
          <Link className="icon-link" to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`}>♡<span className="count">{wishlist.length}</span></Link>
          <Link className="icon-link" to={user ? '/profile' : '/login'} aria-label="Account"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg></Link>
          <Link className="icon-link" to="/basket" aria-label={`Cart, ${cartCount} items`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.3 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" /><circle cx="10" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></svg><span className="count">{cartCount}</span></Link>
        </div>
      </header>
      <main className="page-content"><Outlet /></main>
      <footer className="site-footer">
        <Link className="brand footer-brand" to="/">EZE<small>.B</small></Link>
        <span>Luxury, considered.</span>
        <div><Link to="/products">Shop the collection</Link><Link to="/profile">Your account</Link><Link to="/admin">Admin</Link></div>
        <small>© {new Date().getFullYear()} EZE.B. All rights reserved.</small>
      </footer>
      {(toast || notification) && (
        <div className={`toast ${(toast || notification).type || 'success'}`} role="status">
          <span>{(toast || notification).message}</span>
          <button type="button" aria-label="Dismiss notification" onClick={toast ? dismissToast : clearNotification}>×</button>
        </div>
      )}
    </div>
  );
};

export default Layout;
