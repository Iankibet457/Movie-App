import React from 'react';

const Search = ({ search, onSearchChange }) => {
    return (
        <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    );
};

export default Search;
