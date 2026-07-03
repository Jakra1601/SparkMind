import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useFavorite } from '../../context/FavoriteContext';

export function Header({ activeTab, setActiveTab, lang, setLang, t }) {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorite();

  return (
    <header className="app-header glass-nav animate-fade-in">
      <div className="logo-section" onClick={() => setActiveTab('home')}>
        <span className="logo-icon">⚡</span>
        <span className="logo-text">SparkMind</span>
      </div>

      <div className="nav-actions">
        {/* Language Toggle */}
        <button 
          className="action-btn glass-btn lang-btn" 
          onClick={() => setLang(prev => (prev === 'th' ? 'en' : 'th'))}
          aria-label="Toggle language"
          title="Toggle language"
        >
          {lang === 'th' ? 'EN' : 'TH'}
        </button>

        {/* Dark/Light Mode Toggle */}
        <button 
          className="action-btn glass-btn" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Favorite Tab Shortcut Badge */}
        <button 
          className={`action-btn glass-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
          aria-label="View favorites"
          title="View favorites"
          style={{ position: 'relative' }}
        >
          ❤️
          {favorites.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'var(--primary-purple)',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: '700',
              padding: '2px 6px',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--glass-bg)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {favorites.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
