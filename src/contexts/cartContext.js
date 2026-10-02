import React, { createContext, useReducer, useEffect, useState } from 'react'

import { CartReducer } from './cartReducer';

export const CartContext = createContext();

const initialState = { 
    cartItems: JSON.parse(sessionStorage.getItem('cartItems')) || [] 
};

const CartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const addProduct = payLoad => {
        const existingItem = state.cartItems.find(x => x.id === payLoad.id);
        const currentQty = existingItem ? (existingItem.quantity || 1) : 0;
        const stock = payLoad.stock !== undefined ? payLoad.stock : (existingItem ? existingItem.stock : undefined);

        if (stock !== undefined && currentQty >= stock) {
            console.warn(`Stock limit reached for ${payLoad.name}. Available stock: ${stock}`);
            setNotification({
                message: `Cannot add more. Stock limit reached for ${payLoad.name}.`,
                type: 'warning'
            });
            return;
        }

        dispatch({ type: 'ADD', payload: payLoad });
        setNotification({
            message: `${payLoad.name} has been added to your basket.`,
            type: 'success'
        });
    }

    const removeProduct = payLoad => {
        dispatch({ type: 'REMOVE', payload: payLoad });
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
    }

    const getItems = () => {
        return state.cartItems;
    }

    const contextValues = {
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        clearBasket,
        getItems,
        notification,
        setNotification,
        ...state
    }

    return (
        <CartContext.Provider value={contextValues} >
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
