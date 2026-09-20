import React, { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { CartContext } from "../contexts/cartContext"



const CategoryProduct = ({
    id, 
    name, 
    image, 
    specs, 
    features, 
    price, 
    stock
    }) => {
    const navigate = useNavigate();
    const { addProduct } = useContext(CartContext);

  return (
    <StyledArticle>
        <StyledTitle>
            <StyledLink to={`products/${id}`}>{name}</StyledLink>
        </StyledTitle>

        <StyledFigure>
            <StyledImageContainer>
              <img src={`/IMAGES/${image}`} alt={name} />
            </StyledImageContainer>
        </StyledFigure>

        <StyledAside>
            <StyledDimensions>
                <StyledH3>Dimensions</StyledH3>
                <StyledLabel>{specs.dimensions}</StyledLabel>
            </StyledDimensions>

            {specs.capacity &&
            <StyledCapacity>
                <StyledH3>Capacity</StyledH3>
                <StyledLabel>{specs.capacity}</StyledLabel>
            </StyledCapacity>
            }

            <StyledFeatures>
                <StyledH3>Features</StyledH3>
                <StyledUl>
                    {features?.map((f, i) => {
                        return <StyledLi key={`feature${i}`}>{f}</StyledLi>
                    })}
                </StyledUl>
            </StyledFeatures>
        </StyledAside>

        <StyledFinanceAside>
            <StyledFinancePrice>
                &pound;{price}
            </StyledFinancePrice>

            <StyledStock>
                <StyledStockLabel>Stock Label: {stock}</StyledStockLabel>
                <StyledStockLabel>FREE Delivery</StyledStockLabel>
            </StyledStock>

            <StyledAction>
                <StyledButton onClick={() => navigate(`products/${id}`)}>View Products</StyledButton>
                <StyledSecondaryButton onClick={() => addProduct({id, name, price})}>Add to Basket</StyledSecondaryButton>
            </StyledAction>
        </StyledFinanceAside>
    </StyledArticle>
  );
};

export default CategoryProduct;

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

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: var(--primary-color, #2563eb);
  }
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

const StyledSecondaryButton = styled.button`
  flex: 1;
  height: 40px;
  border-radius: var(--radius-sm, 6px);
  margin-top: 0;
  background-color: var(--card-bg, #ffffff);
  color: var(--text-main, #0f172a);
  border: 1px solid var(--border-color, #e2e8f0);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition, all 0.25s cubic-bezier(0.4, 0, 0.2, 1));

  &:hover {
    background-color: var(--bg-color, #f8fafc);
    border-color: var(--secondary-color, #475569);
    color: var(--text-main, #0f172a);
    transform: translateY(-1px);
  }
`;
