// components/ThemeAwareLoader.jsx
"use client";
import { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";

export default function ThemeAwareLoader() {
  const [themeColor, setThemeColor] = useState("#2563eb"); // default fallback

  useEffect(() => {
    const root = document.documentElement;

    const updateColor = () => {
      const color = getComputedStyle(root).getPropertyValue("--color-primary");
      if (color) setThemeColor(color.trim());
    };

    // Initial color
    updateColor();

    // Optional: listen for theme change if you toggle dark/light dynamically
    const observer = new MutationObserver(updateColor);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <NextTopLoader
      color={themeColor}
      initialPosition={0.08}
      crawlSpeed={200}
      height={4}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={1000}
      shadow={`0 0 10px ${themeColor}, 0 0 5px ${themeColor}`}
      zIndex={1600}
      showAtBottom={false}
    />
  );
}
