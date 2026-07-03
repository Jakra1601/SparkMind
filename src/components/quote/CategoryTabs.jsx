import React from 'react';

const CATEGORIES = [
  { id: 'life', th: 'การใช้ชีวิต', en: 'Life' },
  { id: 'growth', th: 'พัฒนาตัวเอง', en: 'Growth' },
  { id: 'work', th: 'การทำงาน', en: 'Work' },
  { id: 'study', th: 'การเรียน', en: 'Study' },
  { id: 'love', th: 'ความรัก', en: 'Love' }
];

export function CategoryTabs({ selectedCategory, onSelectCategory, lang, allLabel }) {
  return (
    <div className="category-filters animate-fade-in">
      {/* "All" Category Pill */}
      <button
        className={`cat-btn glass-btn ${selectedCategory === '' ? 'active' : ''}`}
        onClick={() => onSelectCategory('')}
      >
        {allLabel}
      </button>

      {CATEGORIES.map(cat => {
        const isActive = selectedCategory === cat.id;
        const label = lang === 'th' ? cat.th : cat.en;

        return (
          <button
            key={cat.id}
            className={`cat-btn glass-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
