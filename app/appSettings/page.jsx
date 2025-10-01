"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Palette, ImageIcon, Type } from "lucide-react";
import { useAppSettings } from "../../components/Context/appSettingContext";
import { darkenColor, lightenColor, getContrastText, getBrightness } from "../../utils/color";


export default function AppSettingsPage() {
  const { appName, setAppName, appNameForMobile, setAppNameForMobile} = useAppSettings();
  const [isMobileEditingName, setIsMobileEditingName] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(appName);
  const [tempName2, setTempName2] = useState(appNameForMobile);

  // Default colors
  const defaultColors = {
    primary: "#2563eb",
    secondary: "#10b981",
    tertiary: "#9333ea",
  };

  // Initialize colors from localStorage
  const [colors, setColors] = useState(defaultColors);

  useEffect(() => {
    const savedColors = {
      primary: localStorage.getItem("app-primary-color") || defaultColors.primary,
      secondary: localStorage.getItem("app-secondary-color") || defaultColors.secondary,
      tertiary: localStorage.getItem("app-tertiary-color") || defaultColors.tertiary,
    };
    setColors(savedColors);

    // Apply all colors and hover dynamically
    Object.entries(savedColors).forEach(([key, value]) => {
      applyColor(key, value);
    });
  }, []);

  // Apply color to CSS variables
  const applyColor = (key, value) => {
    const isDark = document.documentElement.classList.contains("dark");
    let appliedColor = value;
    let hoverColor;

    // Adaptive hover based on brightness
    if (getBrightness(value) > 150) {
      hoverColor = darkenColor(value, 0.2);
    } else {
      hoverColor = lightenColor(value, 0.2);
    }

    // Dark mode adjustment
    if (isDark) appliedColor = darkenColor(value, 0.25);

    const onColor = getContrastText(appliedColor);

      // 🔹 Apply immediately
    document.documentElement.style.setProperty(`--color-${key}`, appliedColor);
    document.documentElement.style.setProperty(`--color-on-${key}`, onColor);
    document.documentElement.style.setProperty(`--color-${key}-hover`, hoverColor);

    // 🔹 Persist in localStorage (so refresh works)
    localStorage.setItem(`app-${key}-color`, value);      // base color
    localStorage.setItem(`app-${key}-on`, onColor);       // text color
    localStorage.setItem(`app-${key}-hover`, hoverColor); // hover color
  };

  const handleColorChange = (key, value) => {
    setColors((prev) => ({ ...prev, [key]: value }));
    applyColor(key, value);
  };
  
  return (
    <div className="min-h-screen flex justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div
        className="w-full p-8 space-y-8"
        style={{
          boxShadow: "0 4px 6px var(--shadow-color)",
          background: "var(--background)",
        }}
      >
        {/* ================== THEME COLORS ================== */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" /> Theme Colors
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mb-4 ml-5">
            Choose your custom primary, secondary and tertiary theme colors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Primary", key: "primary" },
              { label: "Secondary", key: "secondary" },
              { label: "Tertiary", key: "tertiary" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-4 border flex flex-col items-center justify-center gap-3 hover:shadow-md transition"
                style={{ borderColor: "var(--border-color)" }}
              >
                {/* Color Picker */}
                <div className="relative w-16 h-16">
                  <input
                    type="color"
                    value={colors[item.key]}
                    onChange={(e) => handleColorChange(item.key, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                    className="w-16 h-16 rounded-full border shadow-sm"
                    style={{ backgroundColor: colors[item.key] }}
                  />
                </div>
                <p className="font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>


        {/* ================== APP NAME-SHORT ================== */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Type className="w-5 h-5" /> Short App Name 
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mb-4 ml-5">
            You can change your application name anytime for mobile device.
          </p>
          <div
            className="flex items-center justify-between p-4 rounded-xl shadow-sm"
            style={{ boxShadow: "0 4px 8px var(--shadow-color)" }}
          >
            <p className="font-medium">{appNameForMobile}</p>
            <button
              onClick={() => {
                setTempName2(appNameForMobile);
                setIsMobileEditingName(true);
              }}
              className="px-4 py-1 rounded-lg bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition"
            >
              Change Name
            </button>
          </div>
        </div>

        {/* ================== APP NAME ================== */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Type className="w-5 h-5" /> App Name
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mb-4 ml-5">
            You can change your application name anytime for your large device (tab and Laptop).
          </p>
          <div
            className="flex items-center justify-between p-4 rounded-xl shadow-sm"
            style={{ boxShadow: "0 4px 8px var(--shadow-color)" }}
          >
            <p className="font-medium">{appName}</p>
            <button
              onClick={() => {
                setTempName(appName);
                setIsEditingName(true);
              }}
              className="px-4 py-1 rounded-lg bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition"
            >
              Change Name
            </button>
          </div>
        </div>
      </div>

      {/* ================== MODALS ================== */}

      {/* short Name Modal */}
      <AnimatePresence>
        {isMobileEditingName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-background p-6 rounded-2xl shadow-lg w-full max-w-md relative mx-4"
            >
              <button
                onClick={() => setIsMobileEditingName(false)}
                className="absolute top-3 right-3 text-[var(--muted-foreground)] hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4">Change App Name</h2>
              <input
                type="text"
                placeholder="Enter new app name"
                value={tempName2}
                onChange={(e) => setTempName2(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border mb-4"
                style={{ borderColor: "var(--border-color)" }}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsMobileEditingName(false)}
                  className="px-4 py-2 rounded-lg border"
                  style={{
                    borderColor: "var(--border-color)",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setAppNameForMobile(tempName2); // update global context
                    setIsMobileEditingName(false);
                  }}
                  className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Modal */}
      <AnimatePresence>
        {isEditingName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-background p-6 rounded-2xl shadow-lg w-full max-w-md relative mx-4"
            >
              <button
                onClick={() => setIsEditingName(false)}
                className="absolute top-3 right-3 text-[var(--muted-foreground)] hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4">Change App Name</h2>
              <input
                type="text"
                placeholder="Enter new app name"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border mb-4"
                style={{ borderColor: "var(--border-color)" }}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditingName(false)}
                  className="px-4 py-2 rounded-lg border"
                  style={{
                    borderColor: "var(--border-color)",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setAppName(tempName); // update global context
                    setIsEditingName(false);
                  }}
                  className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
