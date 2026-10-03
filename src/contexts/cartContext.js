import React, { createContext, useReducer, useEffect, useState } from 'react'

import { CartReducer } from './cartReducer';

export const CartContext = createContext();

const initialState = { 
    cartItems: (() => {
        try {
            return JSON.parse(localStorage.getItem('cartItems')) || [];
        } catch (error) {
            console.error('Unable to load the saved basket.', error);
            return [];
        }
    })()
};

const CartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);
    const [notification, setNotification] = useState(null);
    const [discountCode, setDiscountCode] = useState(() => localStorage.getItem('eze-discount-code') || '');

    useEffect(() => {
        if (discountCode) localStorage.setItem('eze-discount-code', discountCode);
        else localStorage.removeItem('eze-discount-code');
    }, [discountCode]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    useEffect(() => {
        if (!notification) return undefined;
        const timer = window.setTimeout(() => setNotification(null), 3200);
        return () => window.clearTimeout(timer);
    }, [notification]);

    const clearNotification = () => {
        setNotification(null);
    }

    const addProduct = (payLoad, amount = 1) => {
        const existingItem = state.cartItems.find(x => x.id === payLoad.id);
        const currentQty = existingItem ? (existingItem.quantity || 1) : 0;
        const stock = payLoad.stock !== undefined ? payLoad.stock : (existingItem ? existingItem.stock : undefined);
        const quantityToAdd = Math.max(1, Number(amount) || 1);

        if (stock !== undefined && currentQty + quantityToAdd > stock) {
            console.warn(`Stock limit reached for ${payLoad.name}. Available stock: ${stock}`);
            setNotification({
                message: `Cannot add more. Stock limit reached for ${payLoad.name}.`,
                type: 'warning'
            });
            return false;
        }

        dispatch({ type: 'ADD', payload: payLoad, amount: quantityToAdd });
        setNotification({
            message: `${payLoad.name} has been added to your basket.`,
            type: 'success'
        });
        return true;
    }

    const removeProduct = payLoad => {
        dispatch({ type: 'REMOVE', payload: payLoad });
        setNotification({ message: 'Product removed from cart.', type: 'success' });
    }

    const increaseQuantity = payLoad => {
        const existingItem = state.cartItems.find(x => x.id === payLoad.id);
        const currentQty = existingItem ? (existingItem.quantity || 1) : 1;
        const stock = payLoad.stock !== undefined ? payLoad.stock : (existingItem ? existingItem.stock : undefined);

        if (stock !== undefined && currentQty >= stock) {
            console.warn(`Stock limit reached for ${payLoad.name || existingItem?.name}. Available stock: ${stock}`);
            setNotification({
                message: `Cannot increase quantity. Stock limit reached for ${payLoad.name || existingItem?.name}.`,
                type: 'warning'
            });
            return;
        }

        dispatch({ type: 'INCQTY', payload: payLoad });
    }

    const decreaseQuantity = payLoad => {
        dispatch({ type: 'DECQTY', payload: payLoad });
    }

    const clearBasket = () => {
        dispatch({ type: 'CLEAR' });
        setNotification({ message: 'Cart cleared.', type: 'success' });
    }

    const applyDiscount = code => {
        if (code.trim().toUpperCase() !== 'EZE10') {
            setNotification({ message: 'That promotion code is not valid.', type: 'warning' });
            return false;
        }
        setDiscountCode('EZE10');
        setNotification({ message: 'EZE10 applied — 10% off your order.', type: 'success' });
        return true;
    }

    const clearDiscount = () => setDiscountCode('');

    const getItems = () => {
        return state.cartItems;
    }

    const contextValues = {
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        clearBasket,
        discountCode,
        applyDiscount,
        clearDiscount,
        getItems,
        notification,
        setNotification,
        clearNotification,
        ...state
    }

    return (
        <CartContext.Provider value={contextValues} >
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
