import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/home';
import Basket from './components/basket';
import ProtectedRoute from './components/ProtectedRoute';
import {
  AccountPage, AdminPage, CatalogPage, CheckoutPage, LoginPage,
  OrderConfirmationPage, OrderDetailsPage, OrdersPage, ProductDetailsPage,
  RegisterPage, SearchResultsPage, WishlistPage
} from './pages/StorePages';

const protect = (element, admin = false) => <ProtectedRoute admin={admin}>{element}</ProtectedRoute>;
const NotFound = () => <div className="content-wrap"><div className="empty-state"><span className="eyebrow">404 · EZE.B</span><h1>This page isn’t in the collection</h1><Link className="button button-primary" to="/">Return home</Link></div></div>;

function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="products" element={<CatalogPage />} />
    <Route path="products/:productId" element={<ProductDetailsPage />} />
    <Route path="categories/:categoryId" element={<CatalogPage />} />
    <Route path="categories/:categoryId/products/:productId" element={<ProductDetailsPage />} />
    <Route path="search" element={<SearchResultsPage />} />
    <Route path="basket" element={<Basket />} />
    <Route path="wishlist" element={<WishlistPage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="checkout" element={protect(<CheckoutPage />)} />
    <Route path="order-confirmation" element={protect(<OrderConfirmationPage />)} />
    <Route path="order-confirmation/:orderId" element={protect(<OrderConfirmationPage />)} />
    <Route path="orders" element={protect(<OrdersPage />)} />
    <Route path="orders/:orderId" element={protect(<OrderDetailsPage />)} />
    <Route path="profile" element={protect(<AccountPage />)} />
    <Route path="admin" element={protect(<AdminPage />, true)} />
    <Route path="admin/products" element={protect(<AdminPage section="products" />, true)} />
    <Route path="admin/orders" element={protect(<AdminPage section="orders" />, true)} />
    <Route path="admin/customers" element={protect(<AdminPage section="customers" />, true)} />
    <Route path="admin/analytics" element={protect(<AdminPage section="analytics" />, true)} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes></BrowserRouter>;
}

export default App;
