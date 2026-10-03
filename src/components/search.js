import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submitSearch = event => {
    event.preventDefault();
    const term = query.trim();
    if (term) navigate(`/search?s=${encodeURIComponent(term)}`);
  };

  return (
    <form className="search-form" role="search" onSubmit={submitSearch}>
      <label className="sr-only" htmlFor="site-search">Search the collection</label>
      <input id="site-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the collection" />
      <button type="submit" aria-label="Search">⌕</button>
    </form>
  );
};

export default Search;
