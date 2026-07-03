import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addFavorite = (id) => {
    if (!favorites.includes(id)) {
      setFavorites(prev => [...prev, id]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(favId => favId !== id));
  };

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const toggleFavorite = (id) => {
    if (isFavorite(id)) {
      removeFavorite(id);
      return false; // removed
    } else {
      addFavorite(id);
      return true; // added
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, clearAllFavorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
}
