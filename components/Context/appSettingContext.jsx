"use client";

import { createContext, useContext, useState, useEffect } from "react";
// import logo from "../../public/truactlogo.png";


const AppSettingsContext = createContext(null);

export function AppSettingsProvider({ children }) {
  const [appName, setAppName] = useState("My Application");
  const [appNameForMobile, setAppNameForMobile] = useState("My App");
  

  // Load from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("appName");
    const storedNameForMobile = localStorage.getItem("appNameForMobile");
    if (storedName) setAppName(storedName);
    if (storedNameForMobile) setAppNameForMobile(storedNameForMobile);
   }, []);

  // Save to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("appName", appName);
  }, [appName]);

  // Save to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("appNameForMobile", appNameForMobile);
  }, [appNameForMobile]);

    return (
        <AppSettingsContext.Provider
        value={{ appName, setAppName, appNameForMobile, setAppNameForMobile}}
        >
        {children}
        </AppSettingsContext.Provider>
    );
}

export const useAppSettings = () => useContext(AppSettingsContext);
