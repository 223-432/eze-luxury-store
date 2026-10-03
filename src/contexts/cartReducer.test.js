import { CartReducer } from './cartReducer';

describe('CartReducer quantity handling', () => {
  const item = { id: 1, name: 'Watch', price: 100, stock: 5, quantity: 1 };

  it('does not remove an item or decrement below one', () => {
    const state = { cartItems: [item] };
    expect(CartReducer(state, { type: 'DECQTY', payload: item })).toBe(state);
  });

  it('decrements quantities while keeping them at least one', () => {
    const state = { cartItems: [{ ...item, quantity: 2 }] };
    expect(CartReducer(state, { type: 'DECQTY', payload: item }).cartItems[0].quantity).toBe(1);
  });

  it('adds the selected quantity to an existing line item', () => {
    const state = { cartItems: [item] };
    expect(CartReducer(state, { type: 'ADD', payload: item, amount: 3 }).cartItems[0].quantity).toBe(4);
  });
});
