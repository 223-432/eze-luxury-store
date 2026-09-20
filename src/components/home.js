import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { getCategories } from '../fetcher';

const Home = () => {
  const [categories, setCategories] = useState({ errorMessage: '', data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      const res = await getCategories();
      setCategories(res);
      setLoading(false);
    };
    fetchHomeData();
  }, []);

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to Chi Mart</HeroTitle>
          <HeroSubtitle>Discover our wide selection of quality products at unbeatable prices. Shop your favorite categories today!</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <SectionHeader>
        <SectionTitle>Shop by Category</SectionTitle>
        <SectionSubtitle>Explore our curated collections</SectionSubtitle>
      </SectionHeader>

      {categories.errorMessage && <ErrorMessage>Error: {categories.errorMessage}</ErrorMessage>}

      {loading ? (
        <LoadingText>Loading categories...</LoadingText>
      ) : (
        <CategoryGrid>
          {categories.data.map((category) => (
            <CategoryCard key={category.id} to={`/categories/${category.id}`}>
              <CategoryCardContent>
                <CategoryName>{category.name}</CategoryName>
                <CategoryDesc>{category.description || 'Explore products in this category'}</CategoryDesc>
                <ExploreLink>Browse Category &rarr;</ExploreLink>
              </CategoryCardContent>
            </CategoryCard>
          ))}
        </CategoryGrid>
      )}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, var(--primary-color, #2563eb) 0%, #1d4ed8 100%);
  color: white;
  padding: 60px 40px;
  border-radius: var(--radius-md, 12px);
  box-shadow: var(--shadow-sm, 0 4px 6px rgba(0, 0, 0, 0.05));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  line-height: 1.6;
  margin: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-main, #0f172a);
  letter-spacing: -0.02em;
  margin: 0;
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: var(--text-muted, #64748b);
  margin: 0;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const CategoryCard = styled(Link)`
  background: var(--card-bg, #ffffff);
  border-radius: var(--radius-md, 12px);
  padding: 24px;
  border: 1px solid var(--border-color, #e2e8f0);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
  text-decoration: none;
  transition: var(--transition, all 0.25s cubic-bezier(0.4, 0, 0.2, 1));
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    border-color: var(--primary-color, #2563eb);
  }
`;

const CategoryCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CategoryName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-main, #0f172a);
  margin: 0;
`;

const CategoryDesc = styled.p`
  font-size: 0.9rem;
  color: var(--text-muted, #64748b);
  margin: 0;
  line-height: 1.5;
`;

const ExploreLink = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-color, #2563eb);
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 12px 16px;
  border-radius: var(--radius-sm, 6px);
  font-size: 0.95rem;
  font-weight: 500;
`;

const LoadingText = styled.p`
  color: var(--text-muted, #64748b);
  font-size: 1rem;
`;
