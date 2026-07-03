import React, { useState } from 'react';
import { useFavorite } from '../../context/FavoriteContext';

export function QuoteCard({ quote, onCopy, onFavorite }) {
  const { toggleFavorite, isFavorite } = useFavorite();
  const [popHeart, setPopHeart] = useState(false);

  const favorited = isFavorite(quote.id);

  const handleFavoriteClick = () => {
    setPopHeart(true);
    const added = toggleFavorite(quote.id);
    if (onFavorite) {
      onFavorite(added);
    }
    setTimeout(() => setPopHeart(false), 300);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    if (onCopy) onCopy();
  };

  return (
    <div className="grid-card glass-card hover-trigger animate-fade-in">
      <div className="quote-content-wrapper" style={{ padding: 0 }}>
        <p className="grid-card-text">{quote.text}</p>
        <p className="grid-card-author">— {quote.author}</p>
      </div>

      <div className="quote-card-footer" style={{ marginTop: 'var(--spacing-md)', padding: 0 }}>
        <span className="category-tag">{quote.category}</span>

        <div className="card-actions">
          {/* Copy Button */}
          <button 
            className="action-btn glass-btn" 
            style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}
            onClick={handleCopyClick}
            title="Copy quote"
            aria-label="Copy quote"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>

          {/* Favorite Button */}
          <button 
            className={`action-btn glass-btn heart-btn ${favorited ? 'active' : ''} ${popHeart ? 'animate-heart-pop' : ''}`}
            style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}
            onClick={handleFavoriteClick}
            title={favorited ? "Remove from favorites" : "Add to favorites"}
            aria-label="Toggle favorite"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
