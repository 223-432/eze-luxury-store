import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { CartContext } from '../contexts/cartContext';

const Checkout = () => {
  const { cartItems, clearBasket } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.postalCode || !formData.cardNumber) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setOrderPlaced(true);
    clearBasket();
  };

  if (orderPlaced) {
    return (
      <CheckoutContainer>
        <SuccessCard>
          <SuccessTitle>Order Placed Successfully! 🎉</SuccessTitle>
          <SuccessText>Thank you for your purchase. We've received your order and are getting it ready for shipment.</SuccessText>
          <PrimaryButton onClick={() => navigate('/')}>Continue Shopping</PrimaryButton>
        </SuccessCard>
      </CheckoutContainer>
    );
  }

  if (cartItems.length === 0) {
    return (
      <CheckoutContainer>
        <CheckoutTitle>Checkout</CheckoutTitle>
        <EmptyMessage>Your cart is empty. Add some products before checking out.</EmptyMessage>
        <PrimaryButton onClick={() => navigate('/')}>Browse Products</PrimaryButton>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <CheckoutLayout>
        <FormSection onSubmit={handleSubmit}>
          <SectionTitle>Shipping Information</SectionTitle>
          <InputGroup>
            <Label>Full Name *</Label>
            <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
          </InputGroup>
          <InputGroup>
            <Label>Email Address *</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
          </InputGroup>
          <InputGroup>
            <Label>Street Address *</Label>
            <Input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St" />
          </InputGroup>
          <FormRow>
            <InputGroup>
              <Label>City *</Label>
              <Input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="London" />
            </InputGroup>
            <InputGroup>
              <Label>Postal Code *</Label>
              <Input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="SW1A 1AA" />
            </InputGroup>
          </FormRow>
          <InputGroup>
            <Label>Country *</Label>
            <Input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="United Kingdom" />
          </InputGroup>

          <SectionTitle>Payment Details</SectionTitle>
          <InputGroup>
            <Label>Card Number *</Label>
            <Input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength="19" />
          </InputGroup>
          <FormRow>
            <InputGroup>
              <Label>Expiry Date *</Label>
              <Input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" />
            </InputGroup>
            <InputGroup>
              <Label>CVV *</Label>
              <Input type="password" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" maxLength="4" />
            </InputGroup>
          </FormRow>

          <SubmitButton type="submit">Place Order (£{total.toFixed(2)})</SubmitButton>
        </FormSection>

        <SummarySection>
          <SectionTitle>Order Summary</SectionTitle>
          <SummaryList>
            {cartItems.map((item) => (
              <SummaryItem key={item.id}>
                <span>{item.name} x {item.quantity || 1}</span>
                <span>£{(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </SummaryItem>
            ))}
          </SummaryList>
          <Divider />
          <SummaryRow>
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping</span>
            <span>£{shipping.toFixed(2)}</span>
          </SummaryRow>
          <Divider />
          <SummaryRow $total>
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </SummaryRow>
        </SummarySection>
      </CheckoutLayout>
    </CheckoutContainer>
  );
};

export default Checkout;

const CheckoutContainer = styled.div`
  max-width: 1000px;
  margin: 32px auto;
  padding: 24px;
  background: var(--card-bg, #ffffff);
  border-radius: var(--radius-md, 12px);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
  border: 1px solid var(--border-color, #e2e8f0);
`;

const CheckoutTitle = styled.h2`
  color: var(--text-main, #0f172a);
  font-weight: 700;
  font-size: 1.75rem;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
`;

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SummarySection = styled.div`
  background: var(--bg-color, #f8fafc);
  padding: 24px;
  border-radius: var(--radius-sm, 8px);
  border: 1px solid var(--border-color, #e2e8f0);
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  color: var(--text-main, #0f172a);
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 4px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main, #0f172a);
`;

const Input = styled.input`
  height: 40px;
  padding: 0 12px;
  border-radius: var(--radius-sm, 6px);
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--card-bg, #ffffff);
  color: var(--text-main, #0f172a);
  font-size: 0.9rem;
  transition: var(--transition, all 0.25s ease);

  &:focus {
    outline: none;
    border-color: var(--primary-color, #2563eb);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const PrimaryButton = styled.button`
  height: 44px;
  border-radius: var(--radius-sm, 6px);
  background-color: var(--primary-color, #2563eb);
  color: white;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: var(--transition, all 0.25s ease);
  margin-top: 16px;
  padding: 0 20px;

  &:hover {
    background-color: var(--primary-hover, #1d4ed8);
  }
`;

const SubmitButton = styled(PrimaryButton)`
  width: 100%;
  margin-top: 24px;
`;

const SummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 250px;
  overflow-y: auto;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-muted, #64748b);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${props => props.$total ? '1.15rem' : '0.95rem'};
  font-weight: ${props => props.$total ? '700' : '500'};
  color: var(--text-main, #0f172a);
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border-color, #e2e8f0);
  margin: 8px 0;
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 10px 14px;
  border-radius: var(--radius-sm, 6px);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 16px;
`;

const EmptyMessage = styled.p`
  color: var(--text-muted, #64748b);
  margin-bottom: 16px;
`;

const SuccessCard = styled.div`
  text-align: center;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const SuccessTitle = styled.h2`
  color: var(--text-main, #0f172a);
  font-size: 1.75rem;
  font-weight: 700;
`;

const SuccessText = styled.p`
  color: var(--text-muted, #64748b);
  max-width: 400px;
  font-size: 1rem;
  line-height: 1.5;
`;
