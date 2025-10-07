"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const ThemeContext = createContext();

// Catalyst API endpoints
const CATALYST_API = {
  get: "https://first-test-10103020174.development.catalystappsail.com/theme",
  update: "https://first-test-10103020174.development.catalystappsail.com/theme",
};

// Default colors
const DEFAULT_COLORS = {
  primary: "#2563eb",
  secondary: "#9333ea", 
  tertiary: "#f97316"
};

export function ThemeProvider({ children }) {
  const [themeColors, setThemeColors] = useState(DEFAULT_COLORS);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Fetch theme from database on initial load
  useEffect(() => {
    fetchThemeFromDB();
  }, []);

  const getStoredColors = () => {
    try {
      // Try to get from localStorage first
      const savedColors = localStorage.getItem("themeColors");
      if (savedColors) {
        const parsedColors = JSON.parse(savedColors);
        // Validate that we have all required colors
        if (parsedColors.primary && parsedColors.secondary && parsedColors.tertiary) {
          return parsedColors;
        }
      }
    } catch (error) {
      console.error('Error reading stored colors:', error);
    }
    return DEFAULT_COLORS;
  };

  const fetchThemeFromDB = async () => {
    try {
      setLoading(true);
      
      // Immediately set colors from localStorage to show previous values
      const storedColors = getStoredColors();
      setThemeColors(storedColors);
      applyColors(storedColors);

      // Then fetch from API
      const response = await axios.get(CATALYST_API.get);
      const result = response.data;

      console.log("API Response:", result);
      
      if (result && result.length > 0) {
        const themeData = result[0].Theme_Settings;
        
        const newColors = {
          primary: themeData?.primaryColor || DEFAULT_COLORS.primary,
          secondary: themeData?.secondaryColor || DEFAULT_COLORS.secondary,
          tertiary: themeData?.tertiaryColor || DEFAULT_COLORS.tertiary,
        };

        console.log("Extracted colors from API:", newColors);

        // Only update if colors are different from stored ones
        if (JSON.stringify(newColors) !== JSON.stringify(storedColors)) {
          setThemeColors(newColors);
          applyColors(newColors);
          localStorage.setItem("themeColors", JSON.stringify(newColors));
        }
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
      // Keep using the stored colors (already set above)
      console.log('Using stored colors due to API error');
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  const updateThemeInDB = async (newColors) => {
    try {
      // Map frontend keys to backend keys
      const payload = {
        primaryColor: newColors.primary,
        secondaryColor: newColors.secondary,
        tertiaryColor: newColors.tertiary,
      };

      console.log("Sending payload to backend:", payload);

      const response = await axios.post(CATALYST_API.update, payload);

      if (response.data) {
        console.log("Theme updated successfully in Catalyst");
        // Update localStorage immediately
        localStorage.setItem("themeColors", JSON.stringify(newColors));
        return true;
      }
    } catch (error) {
      console.error("Failed to update theme in API:", error);
      // Still update localStorage for consistency
      localStorage.setItem("themeColors", JSON.stringify(newColors));
      console.log("Applied theme changes locally due to API error");
    }
    return false;
  };

  const applyColors = (colors) => {
    Object.entries(colors).forEach(([key, value]) => {
      applyColor(key, value);
    });
  };

  const applyColor = (key, value) => {
    const { darkenColor, lightenColor, getContrastText, getBrightness } = require('../../utils/color');
    
    const isDark = document.documentElement.classList.contains("dark");
    let appliedColor = value;
    let hoverColor;

    if (getBrightness(value) > 150) {
      hoverColor = darkenColor(value, 0.2);
    } else {
      hoverColor = lightenColor(value, 0.2);
    }

    if (isDark) appliedColor = darkenColor(value, 0.25);

    const onColor = getContrastText(appliedColor);

    document.documentElement.style.setProperty(`--color-${key}`, appliedColor);
    document.documentElement.style.setProperty(`--color-on-${key}`, onColor);
    document.documentElement.style.setProperty(`--color-${key}-hover`, hoverColor);

    // Cache individual colors in localStorage
    localStorage.setItem(`app-${key}-color`, value);
    localStorage.setItem(`app-${key}-on`, onColor);
    localStorage.setItem(`app-${key}-hover`, hoverColor);
  };

  const updateTheme = async (colors) => {
    try {
      // Update local state and localStorage immediately
      setThemeColors(colors);
      applyColors(colors);
      localStorage.setItem("themeColors", JSON.stringify(colors));
      
      // Then update in database (fire and forget)
      updateThemeInDB(colors);
      
      return { success: true };
    } catch (error) {
      console.error('Error updating theme:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    themeColors,
    updateTheme,
    loading,
    initialized,
    refreshTheme: fetchThemeFromDB
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};