export const CartReducer = (state, action) => {
    let index = -1;

    if (action.payload) {
        index = state.cartItems.findIndex(x => x.id === action.payload.id);
    }

    let newState;

    switch (action.type) {
        case "ADD":
            if (index === -1) {
                newState = {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
                };
                break;
            } else {
                const updatedItems = [...state.cartItems];
                const currentQty = updatedItems[index].quantity || 1;
                updatedItems[index] = {
                    ...updatedItems[index],
                    quantity: currentQty + 1
                };
                newState = {
                    ...state,
                    cartItems: updatedItems
                };
                break;
            }

        case "INCQTY":
            if (index > -1) {
                const updatedItems = [...state.cartItems];
                const currentQty = updatedItems[index].quantity || 1;
                updatedItems[index] = {
                    ...updatedItems[index],
                    quantity: currentQty + 1
                };
                newState = {
                    ...state,
                    cartItems: updatedItems
                };
                break;
            }
            return state;

        case "REMOVE":
            if (index > -1) {
                newState = {
                    ...state,
                    cartItems: state.cartItems.filter(x => x.id !== action.payload.id)
                };
                break;
            }
            return state;

        case "DECQTY":
            if (index > -1) {
                const updatedItems = [...state.cartItems];
                const currentQty = updatedItems[index].quantity || 1;

                if (currentQty > 1) {
                    updatedItems[index] = {
                        ...updatedItems[index],
                        quantity: currentQty - 1
                    };
                    newState = {
                        ...state,
                        cartItems: updatedItems
                    };
                } else {
                    newState = {
                        ...state,
                        cartItems: state.cartItems.filter(x => x.id !== action.payload.id)
                    };
                }
                break;
            }
            return state;

        case "CLEAR":
            newState = {
                ...state,
                cartItems: []
            };
            break;

        default:
            return state;
    }

    // Persist updated cart state to sessionStorage for tab isolation
    if (newState && typeof window !== 'undefined') {
        sessionStorage.setItem('cartItems', JSON.stringify(newState.cartItems));
    }

    return newState;
}
