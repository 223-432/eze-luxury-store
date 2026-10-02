import React, { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { getProductById } from '../fetcher';
import { CartContext } from '../contexts/cartContext';

const ProductDetail = () => {
    const [product, setProduct]  = useState({errorMessage: '', data: {} });
    const {productId} = useParams();
    const cartContext = useContext(CartContext);
    const { addProduct, cartItems } = cartContext;

    useEffect(() => {
        const fetchData = async () => {
            const responseObject = await getProductById(productId);
            setProduct(responseObject);
        }
        fetchData()
    }, [productId]);

    const cartItem = cartItems.find(item => item.id === product.data.id);
    const currentQty = cartItem ? (cartItem.quantity || 1) : 0;
    const isOutOfStock = product.data.stock !== undefined && currentQty >= product.data.stock;

  return (
        <StyledArticle>
        <StyledTitle>
            {product.data.name}
        </StyledTitle>

        <StyledFigure>
            <StyledImageContainer>
              <img src={`/IMAGES/${product.data.image}`} alt={product.data.name} />
            </StyledImageContainer>
        </StyledFigure>

        <StyledAside>
            <StyledDimensions>
                <StyledH3>Dimensions</StyledH3>
                <StyledLabel>{product.data.specs?.dimensions}</StyledLabel>
            </StyledDimensions>

            {product.data.specs?.capacity &&
            <StyledCapacity>
                <StyledH3>Capacity</StyledH3>
                <StyledLabel>{product.data.specs?.capacity}</StyledLabel>
            </StyledCapacity>
            }

            <StyledFeatures>
                <StyledH3>Features</StyledH3>
                <StyledUl>
                    {product.data.features?.map((f, i) => {
                        return <StyledLi key={`feature${i}`}>{f}</StyledLi>
                    })}
                </StyledUl>
            </StyledFeatures>
        </StyledAside>

        <StyledFinanceAside>
            <StyledFinancePrice>
                &pound;{product.data.price}
            </StyledFinancePrice>

            <StyledStock>
                <StyledStockLabel>Stock Label: {product.data.stock}</StyledStockLabel>
                <StyledStockLabel>FREE Delivery</StyledStockLabel>
            </StyledStock>

            <StyledAction>
                <StyledButton 
                    onClick={() => addProduct({id: product.data.id, name: product.data.name, price: product.data.price, stock: product.data.stock})}
                    disabled={isOutOfStock}
                    style={isOutOfStock ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                >
                    {isOutOfStock ? 'Stock Limit Reached' : 'Add to Basket'}
                </StyledButton>
            </StyledAction>
        </StyledFinanceAside>

        <StyledDescription>{product.data.description}</StyledDescription>

    </StyledArticle>
  )
}

export default ProductDetail;

const StyledArticle = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  background: var(--card-bg, #ffffff);
  border-radius: var(--radius-md, 12px);
  padding: 24px;
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
  border: 1px solid var(--border-color, #e2e8f0);
  transition: var(--transition, all 0.25s cubic-bezier(0.4, 0, 0.2, 1));

  &:hover {
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledTitle = styled.div`
  grid-column: 1 / -1;
  color: var(--text-main, #0f172a);
  font-weight: 700;
  font-size: 1.75rem;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  padding-left: 0;
`;

const StyledFigure = styled.figure`
  margin: 0;
`;

const StyledImageContainer = styled.div`
  padding: 0;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: var(--radius-sm, 6px);
  background-color: #f1f5f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }
`;

const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledDimensions = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--secondary-color, #475569);
  font-size: 0.9rem;
`;

const StyledCapacity = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--secondary-color, #475569);
  font-size: 0.9rem;
`;

const StyledFeatures = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--secondary-color, #475569);
  font-size: 0.9rem;
`;

const StyledH3 = styled.h3`
  color: var(--text-main, #0f172a);
  font-size: 0.95rem;
  font-weight: 600;
  padding-top: 12px;
  padding-bottom: 4px;
  margin: 0;
`;

const StyledLabel = styled.label`
  font-weight: 500;
  color: var(--text-main, #0f172a);
`;

const StyledUl = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 4px;
  color: var(--secondary-color, #475569);
`;

const StyledLi = styled.li`
  margin-bottom: 2px;
`;

const StyledFinanceAside = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledFinancePrice = styled.div`
  color: var(--primary-color, #2563eb);
  font-size: 1.5rem;
  font-weight: 700;
  padding-top: 0;
`;

const StyledStock = styled.div`
  padding: 12px 16px;
  margin-top: 16px;
  background-color: #f8fafc;
  border: 1px solid var(--border-color, #e2e8f0);
  width: 100%;
  border-radius: var(--radius-sm, 6px);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--accent-new, #10b981);
  display: flex;
  flex-direction: column;
`;

const StyledStockLabel = styled.label`
  padding-bottom: 2px;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--text-muted, #64748b);

  &:first-child {
    color: var(--accent-new, #10b981);
  }
`;

const StyledAction = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const StyledButton = styled.button`
  flex: 1;
  height: 40px;
  border-radius: var(--radius-sm, 6px);
  margin-top: 0;
  background-color: var(--primary-color, #2563eb);
  color: white;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition, all 0.25s cubic-bezier(0.4, 0, 0.2, 1));
  box-shadow: 0 1px 2px rgba(37, 99, 235, 0.2);

  &:hover {
    background-color: var(--primary-hover, #1d4ed8);
    transform: translateY(-1px);
  }
`;

const StyledDescription = styled.div`
  grid-column: 1 / -1;
  margin-top: 16px;
  color: var(--secondary-color, #475569);
  line-height: 1.6;
`;
