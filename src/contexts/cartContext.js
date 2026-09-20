import React, { createContext, useReducer, useEffect } from 'react'

import { CartReducer } from './cartReducer';

export const CartContext = createContext();

const initialState = { 
    cartItems: JSON.parse(sessionStorage.getItem('cartItems')) || [] 
};

const CartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    const addProduct = payLoad => {
        dispatch({ type: 'ADD', payload: payLoad });
    }

    const removeProduct = payLoad => {
        dispatch({ type: 'REMOVE', payload: payLoad });
    }

    const increaseQuantity = payLoad => {
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
        ...state
    }

    return (
        <CartContext.Provider value={contextValues} >
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
