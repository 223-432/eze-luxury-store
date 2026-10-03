import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error);
    return fallback;
  }
};

const hashPassword = async (password, salt) => {
  if (!window.crypto?.subtle) throw new Error('Secure password storage is unavailable in this browser.');
  const digest = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${password}`));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
};

const createPasswordSalt = () => Array.from(window.crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStorage('eze-user', null));
  const [users, setUsers] = useState(() => readStorage('eze-customers', []));
  const [wishlist, setWishlist] = useState(() => readStorage('eze-wishlist', []));
  const [orders, setOrders] = useState(() => readStorage('eze-orders', []));
  const [products, setProducts] = useState(() => readStorage('eze-products', null));
  const [categories, setCategories] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/db.json')
      .then(response => {
        if (!response.ok) throw new Error(`Catalog request failed (${response.status}).`);
        return response.json();
      })
      .then(data => {
        if (active) {
          setCategories(data.categories || []);
          setProducts(current => current || data.products || []);
        }
      })
      .catch(error => {
        console.error('Unable to load the product catalog.', error);
        if (active) {
          setCatalogError(error.message);
          showToast('The product catalog could not be loaded. Please refresh to try again.', 'error');
        }
      })
      .finally(() => {
        if (active) setCatalogLoading(false);
      });
    return () => { active = false; };
  }, [showToast]);

  useEffect(() => { localStorage.setItem('eze-user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('eze-customers', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('eze-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('eze-orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => {
    if (products) localStorage.setItem('eze-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const login = useCallback(async (email, password) => {
    if (email.trim().toLowerCase() === 'admin@eze.com' && password === 'Admin123!') {
      const admin = { name: 'EZE Administrator', email: 'admin@eze.com', role: 'admin' };
      setUser(admin);
      return { ok: true };
    }
    const customer = users.find(item => item.email.toLowerCase() === email.trim().toLowerCase());
    if (!customer?.passwordSalt) return { ok: false, error: 'Email or password is incorrect.' };
    let passwordHash;
    try {
      passwordHash = await hashPassword(password, customer.passwordSalt);
    } catch (error) {
      return { ok: false, error: error.message };
    }
    if (customer.passwordHash !== passwordHash) return { ok: false, error: 'Email or password is incorrect.' };
    const safeUser = { id: customer.id, name: customer.name, email: customer.email, role: customer.role, phone: customer.phone };
    setUser(safeUser);
    return { ok: true };
  }, [users]);

  const register = useCallback(async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some(item => item.email.toLowerCase() === normalizedEmail) || normalizedEmail === 'admin@eze.com') {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    if (!window.crypto?.getRandomValues) return { ok: false, error: 'Secure password storage is unavailable in this browser.' };
    const passwordSalt = createPasswordSalt();
    let passwordHash;
    try {
      passwordHash = await hashPassword(password, passwordSalt);
    } catch (error) {
      return { ok: false, error: error.message };
    }
    const customer = { id: `customer-${Date.now()}`, name: name.trim(), email: normalizedEmail, passwordSalt, passwordHash, role: 'customer' };
    setUsers(current => [...current, customer]);
    const safeUser = { id: customer.id, name: customer.name, email: customer.email, role: customer.role };
    setUser(safeUser);
    return { ok: true };
  }, [users]);

  const logout = useCallback(() => {
    setUser(null);
    showToast('You have been signed out.');
  }, [showToast]);

  const updateProfile = useCallback(updates => {
    setUser(current => ({ ...current, ...updates }));
    setUsers(customers => customers.map(customer =>
      customer.email === user.email ? { ...customer, ...updates } : customer
    ));
    showToast('Profile updated.');
  }, [showToast, user]);

  const isWishlisted = useCallback(productId => wishlist.some(item => item.id === productId), [wishlist]);
  const toggleWishlist = useCallback(product => {
    setWishlist(current => {
      const exists = current.some(item => item.id === product.id);
      showToast(exists ? 'Removed from wishlist.' : 'Added to wishlist.');
      return exists ? current.filter(item => item.id !== product.id) : [...current, product];
    });
  }, [showToast]);
  const removeFromWishlist = useCallback(productId => {
    setWishlist(current => current.filter(item => item.id !== productId));
    showToast('Removed from wishlist.');
  }, [showToast]);

  const placeOrder = useCallback(order => {
    const saved = { ...order, id: `EZE-${Date.now().toString(36).toUpperCase()}`, date: new Date().toISOString(), status: 'Processing' };
    setOrders(current => [saved, ...current]);
    showToast('Order placed successfully.');
    return saved;
  }, [showToast]);
  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(current => current.map(order => order.id === orderId ? { ...order, status } : order));
  }, []);

  const saveProduct = useCallback(product => {
    setProducts(current => {
      const items = current || [];
      return items.some(item => item.id === product.id)
        ? items.map(item => item.id === product.id ? product : item)
        : [...items, { ...product, id: product.id ?? Date.now() }];
    });
  }, []);
  const deleteProduct = useCallback(productId => {
    setProducts(current => (current || []).filter(item => item.id !== productId));
  }, []);

  const value = useMemo(() => ({
    user, users, login, register, logout, updateProfile,
    wishlist, isWishlisted, toggleWishlist, removeFromWishlist,
    orders, placeOrder, updateOrderStatus,
    products: products || [], categories, catalogLoading, catalogError, saveProduct, deleteProduct,
    toast, showToast, dismissToast: () => setToast(null)
  }), [user, users, login, register, logout, updateProfile, wishlist, isWishlisted, toggleWishlist, removeFromWishlist, orders, placeOrder, updateOrderStatus, products, categories, catalogLoading, catalogError, saveProduct, deleteProduct, toast, showToast]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider.');
  return context;
};
