"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const ThemeContext = createContext();

// Catalyst API endpoints
const CATALYST_API = {
  get: "https://first-test-10103020174.development.catalystappsail.com/theme",
  update:
    "https://first-test-10103020174.development.catalystappsail.com/theme",
};

export function ThemeProvider({ children }) {
  const [themeColors, setThemeColors] = useState({
    primary: "#2563eb",
    secondary: "#9333ea", 
    tertiary: "#f97316"
  });
  const [loading, setLoading] = useState(true);

  // Fetch theme from database on initial load
  useEffect(() => {
    fetchThemeFromDB();
  }, []);

  const fetchThemeFromDB = async () => {
    try {
      setLoading(true);
      const response = await axios.get(CATALYST_API.get);
      const result = response.data;

      console.log("API Response:", result);
      
      // Extract colors from Catalyst response format
        if (result && result.length > 0) {
            const themeData = result[0].Theme_Settings; // Access Theme_Settings object
            const newColors = {
            primary: themeData?.primaryColor || "#2563eb",
            secondary: themeData?.secondaryColor || "#9333ea",
            tertiary: themeData?.tertiaryColor || "#f97316",
            };

            console.log("Extracted colors:", newColors);

            setThemeColors(newColors);
            applyColors(newColors);
            localStorage.setItem("themeColors", JSON.stringify(newColors));

            return newColors;
        }
    } catch (error) {
      console.error('Error fetching theme:', error);
      // No localStorage fallback - use defaults
      // Use localStorage fallback
      const savedColors = localStorage.getItem("themeColors");
      if (savedColors) {
        const parsedColors = JSON.parse(savedColors);
        setThemeColors(parsedColors);
        applyColors(parsedColors);
        return parsedColors;
      }
      // Use default colors as final fallback
      applyColors(colors);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const updateThemeInDB = async (newColors) => {
        try {
        const payload = {
            primaryColor: newColors.primary,
            tertiaryColor: newColors.tertiary,
            secondaryColor: newColors.secondary,
        };

        // Try POST instead of PATCH
        const response = await axios.post(CATALYST_API.update, payload);

        if (response.data) {
            console.log("Theme updated successfully in Catalyst");
            return true;
        }
        } catch (error) {
        console.error("Failed to update theme in API:", error);

        // Fallback: Store locally and apply changes anyway
        console.log("Applying theme changes locally...");
        // return true; // Don't throw error, allow local update
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

    // Only use localStorage as temporary cache, not as source of truth
    localStorage.setItem(`app-${key}-color`, value);
    localStorage.setItem(`app-${key}-on`, onColor);
    localStorage.setItem(`app-${key}-hover`, hoverColor);
  };

  const updateTheme = async (colors) => {
    try {
      // Update in database
      await updateThemeInDB(colors);
      
      // Update local state
      setThemeColors(colors);
      
      // Apply colors to CSS
      applyColors(colors);
      
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