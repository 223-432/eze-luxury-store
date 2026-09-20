import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductsByQuery } from '../fetcher';
import CategoryProduct from './categoryProduct';

const SearchResults = () => {
    const [products, setProducts] = useState({
        errorMessage: "",
        data: [],
    });
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const rawQuery = searchParams.get('s') || '';
    const query = decodeURIComponent(rawQuery);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const responseObject = await getProductsByQuery(query); 
            setProducts(responseObject);
            setLoading(false);
        };
        fetchData();
    }, [query]);

    const renderProducts = () => {
        if (!products.data || products.data.length === 0) {
            return (
                <EmptyStateContainer>
                    <EmptyTitle>No products found for "{query}"</EmptyTitle>
                    <EmptyText>Make sure to type the exact product name (case-sensitive).</EmptyText>
                </EmptyStateContainer>
            );
        }

        // Check for case-sensitive exact match against product names
        const exactMatch = products.data.find(
            p => p.name === query
        );

        if (!exactMatch) {
            return (
                <EmptyStateContainer>
                    <EmptyTitle>No exact match found for "{query}"</EmptyTitle>
                    <EmptyText>Please enter the exact product name (case-sensitive) to view the product.</EmptyText>
                </EmptyStateContainer>
            );
        }

        return (
            <ResultsWrapper>
                <SectionGroup>
                    <SectionHeading>Exact Match Product</SectionHeading>
                    <ResultsGrid>
                        <CategoryProduct key={exactMatch.id} {...exactMatch} />
                    </ResultsGrid>
                </SectionGroup>
            </ResultsWrapper>
        );
    };

    return (
        <SearchContainer>
            <SearchHeader>
                <SearchTitle>Search Results</SearchTitle>
                {query && <SearchQueryInfo>Showing results for: "{query}"</SearchQueryInfo>}
            </SearchHeader>

            {products.errorMessage && <ErrorMessage>Error: {products.errorMessage}</ErrorMessage>}

            {loading ? (
                <LoadingText>Searching products...</LoadingText>
            ) : (
                renderProducts()
            )}
        </SearchContainer>
    );
}

export default SearchResults;

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SearchHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SearchTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-main, #0f172a);
  letter-spacing: -0.02em;
  margin: 0;
`;

const SearchQueryInfo = styled.p`
  font-size: 1rem;
  color: var(--text-muted, #64748b);
  margin: 0;
`;

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-main, #0f172a);
  border-bottom: 2px solid var(--border-color, #e2e8f0);
  padding-bottom: 8px;
  margin: 0;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const EmptyStateContainer = styled.div`
  background: var(--card-bg, #ffffff);
  border-radius: var(--radius-md, 12px);
  padding: 48px 24px;
  text-align: center;
  border: 1px solid var(--border-color, #e2e8f0);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-main, #0f172a);
  margin: 0;
`;

const EmptyText = styled.p`
  font-size: 0.95rem;
  color: var(--text-muted, #64748b);
  margin: 0;
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
