import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const defaultTheme = {
  id: 'default',
  name: 'Classic Purple',
  description: 'Original FitTrack theme',
  colors: {
    primary: '#8B5CF6',
    secondary: '#F472B6',
    accent: '#6D28D9',
    background: '#0F172A',
    surface: '#1E293B',
    border: '#334155'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('fittrack-theme');
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        setCurrentTheme(parsedTheme);
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('fittrack-theme', JSON.stringify(currentTheme));
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [currentTheme]);

  const changeTheme = (newTheme) => {
    setCurrentTheme(newTheme);
  };

  const value = {
    currentTheme,
    changeTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 