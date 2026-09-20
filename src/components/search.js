import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm) {
            navigate('/search?s=' + searchTerm);
            }
        }, 300);

        return () => clearTimeout(delay);

    }, [searchTerm, navigate])

    const handleChange = ev => {
        setSearchTerm(ev.target.value);
    }

    return (
        <div id="search">
            <label>Search</label>
            <input type="text" name="search" onChange={handleChange} placeholder="Search products..." />
        </div>
    )
} 

export default Search