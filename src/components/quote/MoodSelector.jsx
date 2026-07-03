import React from 'react';

const MOODS = [
  { id: 'happy', emoji: '😊', th: 'สุขใจ', en: 'Happy' },
  { id: 'motivated', emoji: '💡', th: 'มีพลัง', en: 'Motivated' },
  { id: 'calm', emoji: '🍃', th: 'สงบ', en: 'Calm' },
  { id: 'inspired', emoji: '✨', th: 'บันดาลใจ', en: 'Inspired' },
  { id: 'tired', emoji: '🥱', th: 'เหนื่อยล้า', en: 'Tired' },
  { id: 'heartbroken', emoji: '💔', th: 'อกหัก', en: 'Sad' }
];

export function MoodSelector({ selectedMood, onSelectMood, lang, labelText }) {
  return (
    <div className="mood-selector animate-fade-in">
      <span className="section-label">{labelText}</span>
      <div className="mood-buttons">
        {MOODS.map(mood => {
          const isActive = selectedMood === mood.id;
          const label = lang === 'th' ? mood.th : mood.en;
          
          return (
            <button
              key={mood.id}
              className={`action-btn glass-btn mood-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectMood(isActive ? '' : mood.id)}
              title={label}
              aria-label={`Filter by ${label}`}
            >
              {mood.emoji}
              <span className="mood-label">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
