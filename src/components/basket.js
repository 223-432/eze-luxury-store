import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../contexts/cartContext';

const Basket = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeProduct, clearBasket } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <BasketContainer>
      <BasketTitle>Shopping Basket</BasketTitle>
      
      {cartItems.length === 0 ? (
        <EmptyMessage>Your basket is currently empty.</EmptyMessage>
      ) : (
        <>
          <BasketTable>
            <BasketHeader>
              <h4>Item</h4>
              <h4>Quantity</h4>
              <h4>Price</h4>
              <h4>Actions</h4> 
            </BasketHeader>
            <BasketHeaderLine />

            {cartItems.map((item) => (
              <CartItemRow key={item.id}>
                <ItemName>{item.name}</ItemName>
                <QuantityControl>
                  <QtyButton onClick={() => decreaseQuantity(item)}>-</QtyButton>
                  <span>{item.quantity}</span>
                  <QtyButton onClick={() => increaseQuantity(item)}>+</QtyButton>
                </QuantityControl>
                <ItemPrice>£{item.price * item.quantity}</ItemPrice>
                <RemoveButton onClick={() => removeProduct(item)}>Remove</RemoveButton>
              </CartItemRow>
            ))}
          </BasketTable>

          <BasketHeaderLine />
          
          <BasketTotal>Total: £{total}</BasketTotal>

          <ActionButtons>
            <BasketButton onClick={() => navigate('/checkout')}>Checkout</BasketButton>
            <ClearButton onClick={() => clearBasket()}>Clear</ClearButton>
          </ActionButtons>
        </>
      )}
    </BasketContainer>
  )
}

export default Basket

const BasketContainer = styled.div`
  background: var(--card-bg, #ffffff);
  border-radius: var(--radius-md, 12px);
  padding: 24px;
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
  border: 1px solid var(--border-color, #e2e8f0);
  max-width: 800px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BasketTitle = styled.h2`
  color: var(--text-main, #0f172a);
  font-weight: 700;
  font-size: 1.75rem;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
`;

const EmptyMessage = styled.p`
  color: var(--text-muted, #64748b);
  font-size: 1rem;
`;

const BasketButton = styled.button`
  height: 40px;
  border-radius: var(--radius-sm, 6px);
  background-color: var(--primary-color, #2563eb);
  color: white;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition, all 0.25s cubic-bezier(0.4, 0, 0.2, 1));
  box-shadow: 0 1px 2px rgba(37, 99, 235, 0.2);
  padding: 0 16px;
  flex: 1;

  &:hover {
    background-color: var(--primary-hover, #1d4ed8);
    transform: translateY(-1px);
  }
`;

const ClearButton = styled(BasketButton)`
  background-color: #ef4444;
  box-shadow: 0 1px 2px rgba(239, 68, 68, 0.2);

  &:hover {
    background-color: #dc2626;
  }
`;

const BasketTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BasketHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  color: var(--text-main, #0f172a);
  font-weight: 600;
  font-size: 1rem;

  h4 {
    margin: 0;
    color: var(--text-main, #0f172a);
    font-size: 0.95rem;
    font-weight: 600;
  }
`;

const CartItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color, #f1f5f9);
`;

const ItemName = styled.span`
  color: var(--text-main, #0f172a);
  font-weight: 500;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
`;

const QtyButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm, 6px);
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--card-bg, #ffffff);
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--bg-color, #f8fafc);
  }
`;

const ItemPrice = styled.span`
  color: var(--primary-color, #2563eb);
  font-weight: 600;
`;

const RemoveButton = styled.button`
  background: transparent;
  color: #ef4444;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;

  &:hover {
    text-decoration: underline;
  }
`;

const BasketHeaderLine = styled.hr`
  border: none;
  border-top: 1px solid var(--border-color, #e2e8f0);
  margin: 8px 0;
`;

const BasketTotal = styled.div`
  color: var(--text-main, #0f172a);
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 8px;
  text-align: right;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;
