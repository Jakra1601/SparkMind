import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FavoriteProvider, useFavorite } from './context/FavoriteContext';
import { quoteService } from './services/quoteService';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Quote Components
import { ActiveQuoteCard } from './components/quote/ActiveQuoteCard';
import { MoodSelector } from './components/quote/MoodSelector';
import { CategoryTabs } from './components/quote/CategoryTabs';
import { SearchBar } from './components/quote/SearchBar';
import { QuoteGrid } from './components/quote/QuoteGrid';

// Import CSS variables and layout files
import './styles/variables.css';
import './styles/main.css';
import './styles/glassmorphism.css';
import './styles/components.css';
import './styles/animations.css';

// Translation Dictionary
const TRANSLATIONS = {
  th: {
    home: 'สุ่มคำคม',
    explore: 'ค้นหาและกรอง',
    favorites: 'คำคมที่ชอบ',
    slogan: 'เติมพลังใจในทุกวัน ด้วยคำคมที่ใช่สำหรับคุณ',
    randomBtn: 'สุ่มรับพลังบวก',
    searchPlaceholder: 'พิมพ์ข้อความคำคม หรือชื่อผู้เขียนที่ต้องการค้นหา...',
    moodLabel: 'วันนี้คุณรู้สึกอย่างไร? (กรองตามอารมณ์)',
    categoryLabel: 'เลือกหมวดหมู่คำคม',
    copied: 'คัดลอกคำคมลงกระดานแล้ว! 📋',
    favAdded: 'บันทึกเป็นคำคมโปรดแล้ว! ❤️',
    favRemoved: 'ลบออกจากรายการโปรดแล้ว! 💔',
    emptyFav: 'คุณยังไม่มีคำคมที่ถูกใจในห้องนี้เลย ลองกดปุ่ม ❤️ บนคำคมอื่นดูนะ',
    emptySearch: 'หาคำคมนี้ไม่เจอเลย ลองค้นหาคำสำคัญอื่น ๆ ดูนะครับ 🔍',
    allCategories: 'ทั้งหมด',
    clearAll: 'ล้างรายการทั้งหมด',
    quoteCount: (count) => `พบคำคมที่ตรงกัน ${count} รายการ`,
    exploreTitle: 'สำรวจคลังคำคม',
    favTitle: 'คำคมที่คุณชื่นชอบ',
    confirmClear: 'คุณต้องการล้างรายการคำคมที่ชอบทั้งหมดใช่หรือไม่?'
  },
  en: {
    home: 'Random Quote',
    explore: 'Explore',
    favorites: 'Favorites',
    slogan: 'Ignite your mind daily with quotes that speak to you.',
    randomBtn: 'Inspire Me Again',
    searchPlaceholder: 'Search quotes or authors...',
    moodLabel: 'How do you feel today? (Filter by mood)',
    categoryLabel: 'Quote Categories',
    copied: 'Quote copied to clipboard! 📋',
    favAdded: 'Added to your favorites! ❤️',
    favRemoved: 'Removed from your favorites! 💔',
    emptyFav: 'No favorited quotes yet. Tap ❤️ on quotes you love!',
    emptySearch: 'No matches found. Try searching different keywords 🔍',
    allCategories: 'All',
    clearAll: 'Clear All',
    quoteCount: (count) => `Found ${count} matching quotes`,
    exploreTitle: 'Explore Quotes Library',
    favTitle: 'Your Saved Quotes',
    confirmClear: 'Are you sure you want to clear all your favorites?'
  }
};

function SparkMindApp() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'explore' | 'favorites'
  const [lang, setLang] = useState('th'); // 'th' | 'en'
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuote, setActiveQuote] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const { favorites, clearAllFavorites } = useFavorite();
  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  // Load quote list
  const allQuotes = useMemo(() => quoteService.getAllQuotes(), []);

  // Filter quotes for Explore tab
  const filteredQuotes = useMemo(() => {
    return quoteService.filterQuotes(allQuotes, {
      mood: selectedMood,
      category: selectedCategory,
      search: searchQuery,
      lang: lang
    });
  }, [allQuotes, selectedMood, selectedCategory, searchQuery, lang]);

  // Filter quotes for Favorites tab
  const favoritedQuotes = useMemo(() => {
    return allQuotes.filter(q => favorites.includes(q.id) && q.lang === lang);
  }, [allQuotes, favorites, lang]);

  // Handle toast notification
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2500);
  };

  // Generate a random quote
  const handleRandomize = () => {
    setIsSpinning(true);
    
    // Filter quotes of selected language for randomizing
    const currentLangQuotes = allQuotes.filter(q => q.lang === lang);
    const excludeId = activeQuote ? activeQuote.id : null;
    const randomQuote = quoteService.getRandomQuote(currentLangQuotes, excludeId);
    
    // Slight timeout to simulate mechanical spin feeling
    setTimeout(() => {
      setActiveQuote(randomQuote);
      setIsSpinning(false);
    }, 500);
  };

  // Switch activeQuote on language change or component mount
  useEffect(() => {
    const currentLangQuotes = allQuotes.filter(q => q.lang === lang);
    const quote = quoteService.getRandomQuote(currentLangQuotes);
    setActiveQuote(quote);
  }, [lang, allQuotes]);

  // Reset filter when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset filters
    setSelectedMood('');
    setSelectedCategory('');
    setSearchQuery('');
  };

  // Clear all favorites
  const handleClearAll = () => {
    if (window.confirm(t.confirmClear)) {
      clearAllFavorites();
      showToast(lang === 'th' ? 'ล้างรายการทั้งหมดแล้ว' : 'Cleared all favorites');
    }
  };

  return (
    <div className="app-container">
      {/* Glow Backdrop Lights */}
      <div className="glow-wrapper">
        <div className="glow-aura glow-blue"></div>
        <div className="glow-aura glow-purple"></div>
      </div>

      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        lang={lang} 
        setLang={setLang}
        t={t}
      />

      <main className="animate-fade-in">
        {/* Navigation Tabs Pill Bar */}
        <div className="nav-tabs">
          <button 
            className={`tab-btn glass-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleTabChange('home')}
          >
            {t.home}
          </button>
          <button 
            className={`tab-btn glass-btn ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => handleTabChange('explore')}
          >
            {t.explore}
          </button>
          <button 
            className={`tab-btn glass-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => handleTabChange('favorites')}
          >
            {t.favorites}
          </button>
        </div>

        {/* 1. HOMEPAGE TAB */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div className="hero-section">
              <h1 className="hero-title">SparkMind</h1>
              <p className="hero-subtitle">{t.slogan}</p>
            </div>

            <ActiveQuoteCard 
              quote={activeQuote} 
              onCopy={() => showToast(t.copied)}
              onFavorite={(added) => showToast(added ? t.favAdded : t.favRemoved)}
            />

            <div className="randomizer-container animate-fade-in">
              <button 
                className={`random-btn ${isSpinning ? 'spinning' : ''}`} 
                onClick={handleRandomize}
                disabled={isSpinning}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isSpinning ? 'animate-spin-once' : ''}>
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                </svg>
                {t.randomBtn}
              </button>
            </div>
          </div>
        )}

        {/* 2. EXPLORE TAB */}
        {activeTab === 'explore' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div className="hero-section" style={{ marginBottom: 'var(--spacing-sm)' }}>
              <h2 className="hero-title" style={{ fontSize: '1.8rem' }}>{t.exploreTitle}</h2>
            </div>

            <div className="filters-panel glass-panel">
              {/* Mood Filter */}
              <MoodSelector 
                selectedMood={selectedMood} 
                onSelectMood={setSelectedMood} 
                lang={lang} 
                labelText={t.moodLabel}
              />
              
              {/* Category Filter */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-sm)' }}>
                <span className="section-label">{t.categoryLabel}</span>
                <CategoryTabs 
                  selectedCategory={selectedCategory} 
                  onSelectCategory={setSelectedCategory} 
                  lang={lang}
                  allLabel={t.allCategories}
                />
              </div>

              {/* Text Search */}
              <div style={{ width: '100%', marginTop: 'var(--spacing-sm)' }}>
                <SearchBar 
                  query={searchQuery} 
                  onChangeQuery={setSearchQuery} 
                  placeholder={t.searchPlaceholder}
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="quote-grid-section">
              <p className="grid-status">{t.quoteCount(filteredQuotes.length)}</p>
              <QuoteGrid 
                quotes={filteredQuotes} 
                onCopy={() => showToast(t.copied)}
                onFavorite={(added) => showToast(added ? t.favAdded : t.favRemoved)}
                emptyMessage={t.emptySearch}
              />
            </div>
          </div>
        )}

        {/* 3. FAVORITES TAB */}
        {activeTab === 'favorites' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div className="hero-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <h2 className="hero-title" style={{ fontSize: '1.8rem' }}>{t.favTitle}</h2>
              {favoritedQuotes.length > 0 && (
                <button className="glass-btn tab-btn" onClick={handleClearAll} style={{ color: 'var(--heart-color)', borderColor: 'rgba(255, 71, 87, 0.2)' }}>
                  🗑️ {t.clearAll}
                </button>
              )}
            </div>

            <div className="quote-grid-section">
              <QuoteGrid 
                quotes={favoritedQuotes} 
                onCopy={() => showToast(t.copied)}
                onFavorite={(added) => showToast(added ? t.favAdded : t.favRemoved)}
                emptyMessage={t.emptyFav}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Global Toast Notification */}
      {toast.show && (
        <div className="toast-container animate-toast">
          <div className="toast">
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoriteProvider>
        <SparkMindApp />
      </FavoriteProvider>
    </ThemeProvider>
  );
}
