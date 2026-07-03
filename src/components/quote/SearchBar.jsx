import React from 'react';

export function SearchBar({ query, onChangeQuery, placeholder }) {
  return (
    <div className="search-wrapper animate-fade-in">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
      />
      {query && (
        <button 
          className="search-clear" 
          onClick={() => onChangeQuery('')}
          aria-label="Clear search"
          title="Clear search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}
