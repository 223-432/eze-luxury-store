import React, { useContext } from 'react'

import { Link, Outlet } from 'react-router-dom'

import { HomeIcon,CartIcon } from './icons'

import Search from "./search";
import styled from 'styled-components';
import { CartContext } from '../contexts/cartContext';

const Layout = ({ categories }) => {
  const { cartItems, notification } = useContext(CartContext);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

      const renderCategories = () => {
    return categories.data.map(c => 
      <li key={c.id}><Link to={`/categories/${c.id}`}>{c.name}</Link></li>
    )
  }

  return (
        <>
        <header>
          <div id="headerHomeIcon">
            <Link to='/'><HomeIcon width={20} /></Link>
          </div>

            <Search />

          <div id="headerTitle">
            Chi Mart
          </div>

          <div id="headerCartIcon" style={{ position: 'relative' }}>
            <Link to='/basket'>
              <CartIcon width={20} />
              {totalItemsCount > 0 && (
                <CartBadge>{totalItemsCount}</CartBadge>
              )}
            </Link>
          </div>
        </header>
    
        <section>
          <nav>
          { categories.errorMessage && <div>Error: {categories.errorMessage}</div> }
    
          <ul>
            { categories.data && renderCategories() }
          </ul>
          </nav>
          <main>
            <Outlet />
          </main>
        </section>
    
        <footer><Link to="/">Home</Link> | <Link to="/basket">Basket</Link></footer>
    
        {notification && (
          <Toast type={notification.type}>
            {notification.message}
          </Toast>
        )}
        </>
  )
}

export default Layout

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Toast = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: ${props => props.type === 'warning' ? '#f59e0b' : '#10b981'};
  color: white;
  padding: 12px 20px;
  border-radius: var(--radius-md, 8px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  font-weight: 600;
  font-size: 0.95rem;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
