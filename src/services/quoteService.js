import quotesData from '../data/quotes.json';

export const quoteService = {
  /**
   * Get all quotes, optionally localized
   * @param {string} lang Optional language code ('th' or 'en')
   * @returns {Array} Array of quotes
   */
  getAllQuotes(lang = '') {
    if (!lang) return quotesData;
    return quotesData.map(q => ({
      id: q.id,
      text: typeof q.text === 'object' ? (q.text[lang] || q.text['en'] || '') : q.text,
      author: typeof q.author === 'object' ? (q.author[lang] || q.author['en'] || '') : q.author,
      mood: q.mood,
      category: q.category,
      lang: lang
    }));
  },

  /**
   * Get a random quote, optionally avoiding a specific ID
   * @param {Array} quotes List of quotes to select from
   * @param {string} excludeId ID to exclude (e.g. current active quote)
   * @returns {Object|null} A random quote or null
   */
  getRandomQuote(quotes = quotesData, excludeId = null) {
    let pool = quotes;
    if (excludeId && quotes.length > 1) {
      pool = quotes.filter(q => q.id !== excludeId);
    }
    if (pool.length === 0) return quotes[Math.floor(Math.random() * quotes.length)] || null;
    return pool[Math.floor(Math.random() * pool.length)];
  },

  /**
   * Filter quotes based on search options
   * @param {Array} quotes List of quotes
   * @param {Object} options Filter options: { mood, category, search, lang }
   * @returns {Array} Filtered list of quotes
   */
  filterQuotes(quotes = quotesData, { mood = '', category = '', search = '', lang = '' } = {}) {
    return quotes.filter(quote => {
      // 1. Language Filter
      if (lang && quote.lang && quote.lang !== lang) {
        return false;
      }
      
      // 2. Mood Filter
      if (mood && quote.mood !== mood) {
        return false;
      }

      // 3. Category Filter
      if (category && quote.category !== category) {
        return false;
      }

      // 4. Text Search Filter (content or author)
      if (search) {
        const query = search.toLowerCase().trim();
        const quoteText = typeof quote.text === 'object' ? (quote.text[lang] || quote.text['en'] || '') : quote.text;
        const quoteAuthor = typeof quote.author === 'object' ? (quote.author[lang] || quote.author['en'] || '') : quote.author;

        const textMatch = quoteText.toLowerCase().includes(query);
        const authorMatch = quoteAuthor.toLowerCase().includes(query);
        return textMatch || authorMatch;
      }

      return true;
    });
  }
};
