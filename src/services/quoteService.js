import quotesData from '../data/quotes.json';

export const quoteService = {
  /**
   * Get all quotes
   * @returns {Array} Array of quotes
   */
  getAllQuotes() {
    return quotesData;
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
      if (lang && quote.lang !== lang) {
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
        const textMatch = quote.text.toLowerCase().includes(query);
        const authorMatch = quote.author.toLowerCase().includes(query);
        return textMatch || authorMatch;
      }

      return true;
    });
  }
};
