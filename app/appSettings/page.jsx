"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Palette, Type } from "lucide-react";
import { useAppSettings } from "../../components/Context/appSettingContext";
import { useTheme } from "../../components/Context/themeContext";

export default function AppSettingsPage() {
  const { appName, setAppName, appNameForMobile, setAppNameForMobile } = useAppSettings();
  const { themeColors, updateTheme, loading } = useTheme();
  
  const [isMobileEditingName, setIsMobileEditingName] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(appName);
  const [tempName2, setTempName2] = useState(appNameForMobile);
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });

  // Temporary colors for selection - initialized from theme context
  const [tempColors, setTempColors] = useState(themeColors);

  // Update tempColors when themeColors change
  useEffect(() => {
    if (!loading) {
      setTempColors(themeColors);
    }
  }, [themeColors, loading]);

  // Update temporary color only
  const handleColorChange = (key, value) => {
    setTempColors((prev) => ({ ...prev, [key]: value }));
  };

  // Save all selected colors to database
  const handleSaveColors = async () => {
    try {
      setSaveStatus({ type: 'loading', message: 'Saving colors...' });
      
      const result = await updateTheme(tempColors);
      
      if (result.success) {
        setSaveStatus({ type: 'success', message: 'Colors saved successfully to database!' });
      } else {
        setSaveStatus({ type: 'error', message: 'Failed to save colors to database.' });
      }
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setSaveStatus({ type: '', message: '' });
      }, 3000);
      
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Error saving colors to database.' });
      setTimeout(() => {
        setSaveStatus({ type: '', message: '' });
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--background)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto"></div>
          <p className="mt-4 text-[var(--foreground)]">Loading theme settings...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div
        className="w-full p-8 space-y-8"
        style={{
          boxShadow: "0 4px 6px var(--shadow-color)",
          background: "var(--background)",
        }}
      >
        {/* Status Message */}
        {saveStatus.message && (
          <div
            className={`p-4 rounded-lg ${
              saveStatus.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : saveStatus.type === 'error'
                ? 'bg-red-100 text-red-800 border border-red-200'
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}
          >
            {saveStatus.type === 'loading' && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800 inline-block mr-2"></div>
            )}
            {saveStatus.message}
          </div>
        )}

        {/* ================== THEME COLORS ================== */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" /> Theme Colors
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mb-4 ml-5">
            Choose your custom primary, secondary and tertiary theme colors. These will be applied to the entire application for all users.
          </p>

          <div style={{ boxShadow: "0 4px 8px var(--shadow-color)" }} className="p-4 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Primary", key: "primary" },
                { label: "Secondary", key: "secondary" },
                { label: "Tertiary", key: "tertiary" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 border flex flex-col items-center justify-center gap-3 hover:shadow-md transition relative"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  {/* Top-right color preview + hex code */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                    <div
                      className="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
                      style={{ backgroundColor: tempColors[item.key] }}
                    />
                    <div
                      className="px-1 py-0.5 rounded border bg-[var(--background)] text-[var(--foreground)] text-xs font-mono"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      {tempColors[item.key].toUpperCase()}
                    </div>
                  </div>

                  {/* Color Picker */}
                  <div className="relative w-16 h-16">
                    <input
                      type="color"
                      value={tempColors[item.key]}
                      onChange={(e) => handleColorChange(item.key, e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="w-16 h-16 rounded-full border shadow-sm"
                      style={{ backgroundColor: tempColors[item.key] }}
                    />
                  </div>

                  <p className="font-medium">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Save button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSaveColors}
                disabled={saveStatus.type === 'loading'}
                className="px-4 py-1 rounded-lg text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saveStatus.type === 'loading' ? 'Saving...' : 'Save Colors'}
              </button>
            </div>
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
              className="px-4 py-1 rounded-lg bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)] transition"
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
              className="px-4 py-1 rounded-lg bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)] transition"
            >
              Change Name
            </button>
          </div>
        </div>
      </div>

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