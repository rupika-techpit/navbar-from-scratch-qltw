// components/ThemeAwareLoader.jsx
"use client";
import NextTopLoader from "nextjs-toploader";
 
export default function ThemeAwareLoader() {
 
  return (
    <NextTopLoader
      color={ "#3b82f6"}
      initialPosition={0.08}
      crawlSpeed={200}
      height={4}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={1000}
      shadow={`0 0 10px ${ "#2299DD"}, 0 0 5px ${
         "#2299DD"
      }`}
      zIndex={1600}
      showAtBottom={false}
    />
  );
}