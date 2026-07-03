import React from 'react';
import { QuoteCard } from './QuoteCard';

export function QuoteGrid({ quotes, onCopy, onFavorite, emptyMessage }) {
  if (quotes.length === 0) {
    return (
      <div className="empty-state glass-panel animate-fade-in">
        <div className="empty-state-icon">🔍</div>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="quote-grid animate-fade-in">
      {quotes.map(quote => (
        <QuoteCard
          key={quote.id}
          quote={quote}
          onCopy={onCopy}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
}
