"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import { AppSettingsProvider } from "@/components/Context/appSettingContext";
import { useEffect } from "react";
import { darkenColor, lightenColor, getContrastText, getBrightness } from "../utils/color";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

function applyStoredColors() {
  ["primary", "secondary", "tertiary"].forEach((key) => {
    const stored = localStorage.getItem(`app-${key}-color`);
    if (!stored) return;

    if (stored) {
      document.documentElement.style.setProperty(`--color-${key}`, stored);
      // We don’t calculate hover/contrast here → only apply what AppSettings has already saved
      const storedOn = localStorage.getItem(`app-${key}-on`);
      const storedHover = localStorage.getItem(`app-${key}-hover`);
      if (storedOn) document.documentElement.style.setProperty(`--color-on-${key}`, storedOn);
      if (storedHover) document.documentElement.style.setProperty(`--color-${key}-hover`, storedHover);

      let appliedColor = stored;
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) appliedColor = darkenColor(stored, 0.25);
    }

    

    // const onColor = getContrastText(appliedColor);

    
    // document.documentElement.style.setProperty(`--color-on-${key}`, onColor);

    // let hoverColor;

    // // Adaptive hover
    // if (getBrightness(value) > 150) {
    //   hoverColor = darkenColor(value, 0.2);
    // } else {
    //   hoverColor = lightenColor(value, 0.2);
    // }
    // document.documentElement.style.setProperty(`--color-${key}-hover`, hoverColor);
  });
}

export default function RootLayout({ children }) {
  useEffect(() => {
    applyStoredColors();

    const observer = new MutationObserver(() => {
      applyStoredColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"], // watch for "dark" class toggle
    });

    return () => observer.disconnect();
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AppSettingsProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow w-full pb-16 pt-[50px] md:pt-[120px]">
                {children}
              </main>
              <Footer />
            </div>
          </AppSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
