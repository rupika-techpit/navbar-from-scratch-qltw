"use client";

import React, { useState, useRef, useEffect } from "react";
import profile from "../../public/profileavatar.png";
import logo from "../../public/truactlogo.png";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Moon,
  Settings,
  LogOut,
  Book,
  Code,
  Database,
  FileText,
  icons,
  SquareChartGantt,
  ShieldUser,
  BadgeAlert,
  Cable,
  BookUser,
  ShieldHalf,
} from "lucide-react";
import { useTheme } from "next-themes";
import Notifications from "../Header/Notification";
import SearchBar from "../Header/searchbar";
import { motion, AnimatePresence } from "framer-motion";
import SubmenuPortal from "../Menu/Submenu";
import { usePathname } from "next/navigation";
import { useAppSettings } from "../../components/Context/appSettingContext";
import { darkenColor, lightenColor, getContrastText, getBrightness } from "../../utils/color";

const Page = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [active, setActive] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState(null);
  const { theme, setTheme } = useTheme();

  const [openMoreDropdown, setOpenMoreDropdown] = useState(null);

  const profileRef = useRef(null);
  const settingsRef = useRef(null);
  const navRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(0); // default

  const [hoveredMoreItem, setHoveredMoreItem] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState("right");
  const [parentRect, setParentRect] = useState(null);
  const closeTimeoutRef = useRef(null);
  const isAdmin = true;
  const { appName, appNameForMobile} = useAppSettings();
  console.log(appName, appNameForMobile);

  const users = [
    { id: "123", role: "admin" },
    { id: "456", role: "donor" },
    { id: "789", role: "user" },
  ];

  const pathname = usePathname(); 
  // e.g. "/123/accountSettings"

  // Extract the first part (id)
  const userId = pathname.split("/")[1];

  // Find the user in your array
  const currentUser = users.find((u) => u.id === userId);

  // Check if admin
  // const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    setIsSettingsOpen(false); // close whenever route changes
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

     document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Responsive visible count
  useEffect(() => {
    if (!navRef.current) return;

    const observer = new ResizeObserver(() => {
      const containerWidth = navRef.current?.offsetWidth || 0;

      // estimate avg width per item (adjust if your design needs)
      const itemWidth = 120;
      const maxVisible = Math.floor(containerWidth / itemWidth) - 1; // leave space for "..."
      setVisibleCount(Math.max(1, Math.min(maxVisible, navItems.length)));
    });

    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMoreDropdown = (name) => {
    setOpenMoreDropdown(openMoreDropdown === name ? null : name);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const navItems = [
    {
      name: "Dashboard-Dashboard-Dashboard-Dashboard-Dashboard",
      path: "/dashboard",
      icon: SquareChartGantt,
      headings: [
        {
          title: "Team- Many options to handle the dashboard pages",
          icon: Book,
          subItems: [
            {
              name: "Marketing-abc abc abc bac bac abc abc abc",
              path: "/dashboard/subModule",
              icon: FileText,
            },
            { name: "Sales", path: "/dashboard/sales", icon: BookUser },
          ],
        },
        {
          title: "Operations",
          subItems: [{ name: "Security", path: "/report/security" }],
        },
      ],
    },
    {
      name: "Reports-Reports-Reports-Reports",
      path: "/report",
      headings: [
        {
          title: "System Analytics and Integration",
          icon: Database,
          subItems: [
            { name: "Analytics", path: "/report/analytics" },
            { name: "Integration", path: "/report/integration" },
            { name: "Security", path: "/report/security" },
          ],
        },
      ],
    },
    {
      name: "Analytics-Analytics-Analytics-Analytics",
      path: "/analytics",
    },
    {
      name: "Forms",
      path: "/forms",
    },
    {
      name: "Analytic-Analytic-Analytic-Analytic",
      path: "/analytic",
      headings: [
        {
          title: "parts",
          icon: Database,
          subItems: [
            { name: "About", path: "/analytic/about" },
            { name: "Team", path: "/analytic/team" },
            { name: "Careers", path: "/analytic/career" },
          ],
        },
      ],
    },
    {
      name: "TechTechi",
      path: "/tech",
      headings: [
        {
          title: "Knowledge",
          subItems: [
            { name: "About", path: "/tech/about" },
            { name: "Team", path: "/tech/team" },
            { name: "Careers", path: "/tech/career" },
          ],
        },
      ],
    },
    {
      name: "ReportsRep",
      path: "/report",
      headings: [
        {
          title: "System Analytics and Integration",
          icon: Database,
          subItems: [
            { name: "Analytics", path: "/report/analytics", icon: BookUser },
            {
              name: "Integration",
              path: "/report/integration",
              icon: FileText,
            },
            { name: "Security", path: "/report/security", icon: ShieldHalf },
          ],
        },
      ],
    },
    {
      name: "AnalyticsAna",
      path: "/analytics",
      subItems: [
        { name: "Basic", path: "/analytics/basic" },
        { name: "Pro", path: "/analytics/pro" },
        { name: "Enterprise", path: "/analytics/enterprise" },
      ],
    },
    {
      name: "FormsForm",
      path: "/forms",
    },
    {
      name: "AnalyticAn-AnalyticAn-AnalyticAn",
      path: "/analytic",
      headings: [
        {
          title: "parts",
          subItems: [
            { name: "About", path: "/analytic/about" },
            { name: "Team", path: "/analytic/team" },
            { name: "Careers", path: "/analytic/career" },
          ],
        },
      ],
    },
    {
      name: "TechTec",
      path: "/tech",
      headings: [
        {
          title: "Knowledge",
          subItems: [
            { name: "About", path: "/tech/about" },
            { name: "Team", path: "/tech/team" },
            { name: "Careers", path: "/tech/career" },
          ],
        },
      ],
    },
    {
      name: "ReportsRe",
      path: "/report",
      headings: [
        {
          title: "System Analytics and Integration",
          icon: Database,
          subItems: [
            { name: "Analytics", path: "/report/analytics", icon: BookUser },
            {
              name: "Integration",
              path: "/report/integration",
              icon: FileText,
            },
            { name: "Security", path: "/report/security", icon: ShieldHalf },
          ],
        },
      ],
    },
    {
      name: "AnalyticsAn",
      path: "/analytics",
      subItems: [
        { name: "Basic", path: "/analytics/basic" },
        { name: "Pro", path: "/analytics/pro" },
        { name: "Enterprise", path: "/analytics/enterprise" },
      ],
    },
    {
      name: "Form",
      path: "/forms",
    },
    {
      name: "Analytica",
      path: "/analytic",
      headings: [
        {
          title: "parts",
          subItems: [
            { name: "About", path: "/analytic/about" },
            { name: "Team", path: "/analytic/team" },
            { name: "Careers", path: "/analytic/career" },
          ],
        },
      ],
    },
    {
      name: "Techi",
      path: "/tech",
      headings: [
        {
          title: "Knowledge",
          subItems: [
            { name: "About", path: "/tech/about" },
            { name: "Team", path: "/tech/team" },
            { name: "Careers", path: "/tech/career" },
          ],
        },
      ],
    },
    {
      name: "ReportsR",
      path: "/report",
      headings: [
        {
          title: "System Analytics and Integration",
          icon: Database,
          subItems: [
            { name: "Analytics", path: "/report/analytics", icon: BookUser },
            {
              name: "Integration",
              path: "/report/integration",
              icon: FileText,
            },
            { name: "Security", path: "/report/security", icon: ShieldHalf },
          ],
        },
      ],
    },
    {
      name: "AnalyticsA",
      path: "/analytics",
      subItems: [
        { name: "Basic", path: "/analytics/basic" },
        { name: "Pro", path: "/analytics/pro" },
        { name: "Enterprise", path: "/analytics/enterprise" },
      ],
    },
    {
      name: "FormsF",
      path: "/forms",
    },
    {
      name: "AnalyticA",
      path: "/analytic",
      headings: [
        {
          title: "parts",
          subItems: [
            { name: "About", path: "/analytic/about" },
            { name: "Team", path: "/analytic/team" },
            { name: "Careers", path: "/analytic/career" },
          ],
        },
      ],
    },
    {
      name: "TechT",
      path: "/tech",
      headings: [
        {
          title: "Knowledge",
          subItems: [
            { name: "About", path: "/tech/about" },
            { name: "Team", path: "/tech/team" },
            { name: "Careers", path: "/tech/career" },
          ],
        },
      ],
    },
  ];

  // const visibleModules = navItems.slice(0, 5);
  // const hiddenModules = navItems.slice(5);

  return (
    <div className="bg-background text-foreground">
      <nav
        className="w-full fixed top-0 left-0 z-50 bg-background border rounded-xl shadow-sm"
        style={{
          borderColor: "var(--border-color)",
          boxShadow: "0 1px 2px var(--shadow-color)",
        }}
      >
        {/* =============== Header ===============*/}
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <div className="h-10 w-20 flex items-center justify-center">
              <Image src={logo} alt="logo" width={100} height={50} />
            </div>
            <span className="font-normal">
              <span className="block lg:hidden">{appNameForMobile}</span> {/* Mobile */}
              <span className="hidden lg:block">
                {" "}
                {appName}
              </span>{" "}
              {/* Desktop */}
            </span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <SearchBar />
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-[var(--hover-bg)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Theme toggler */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition"
            >
              <Moon className="h-6 w-6" />
            </button>

            {/* Notifications */}
            <Notifications />

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center"
              >
                <Image
                  src={profile}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-gray-300 dark:border-gray-800"
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute right-0 top-12 mt-2 w-56 bg-background rounded-xl shadow-lg py-1 z-50"
                    style={{ boxShadow: "var(--dropdown-shadow)" }}
                  >
                    <div className="px-4 pb-1 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium py-1">Sophia Patel</p>
                        <p className="text-xs text-gray-500 py-1">
                          sophia.patel@email.com
                        </p>
                        <p className="text-xs text-gray-500 py-1">
                          User ID: S3546
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="p-2 rounded hover:bg-[var(--hover-bg)]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>

                    <div className="mt-1">
                      <Link
                        href="#"
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[var(--hover-bg)] border-t rounded-b-md"
                        style={{ borderTopColor: "var(--border-top)" }}
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* =============== Menu Bar =============== */}
        <div
          className="hidden md:flex items-center justify-between px-10 py-2 border-t bg-background text-sm font-medium"
          style={{ borderTopColor: "var(--border-top)" }}
        >
          <div className="flex space-x-8 flex-1 min-w-0" ref={navRef}>
            {/* visible modules */}
            {navItems.slice(0, visibleCount).map((item) => (
              <div key={item.path} className="relative">
                {item.headings || item.subItems ? (
                  // === Module with dropdown ===
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md max-w-[120px] ${
                        active === item.name
                          ? "bg-[var(--color-primary-hover)] text-[var(--color-on-primary)]"
                          : "hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)]"
                      }`}
                    >
                      {/* Wrapper for scrolling */}
                      <div className="overflow-hidden max-w-[60px]">
                        <span
                          className={`inline-block whitespace-nowrap ${
                            item.name.length > 7 ? "hover:animate-scroll" : ""
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>

                      {/* Dropdown arrow */}
                      <svg
                        className={`ml-1 h-5 w-5 transition-transform ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown with Headings + SubItems */}
                    <AnimatePresence>
                      {openDropdown === item.name && item.headings && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="absolute left-0 mt-2 w-56 rounded-md bg-background z-50"
                          style={{ boxShadow: "var(--dropdown-shadow)" }}
                        >
                          <div className="py-2">
                            {item.headings.map((heading) => (
                              <div key={heading.title} className="px-4 py-2">
                                <p className="flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 whitespace-break-spaces">
                                  {heading.icon && (
                                    <heading.icon className="h-4 w-4 mr-2" />
                                  )}
                                  {heading.title}
                                </p>
                                <div className="space-y-1">
                                  {heading.subItems.map((sub) => (
                                    <Link
                                      key={sub.path}
                                      href={sub.path}
                                      onClick={() => {
                                        setActive(item.name);
                                        setOpenDropdown(null);
                                      }}
                                      className="flex items-center px-2 py-1 text-sm rounded hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-on-primary)]"
                                    >
                                      {sub.icon && (
                                        <sub.icon className="h-4 w-4 mr-2 shrink-0 z-50" />
                                      )}
                                      {/* Text wrapper (important) */}
                                      <div className="relative overflow-hidden flex-1">
                                        <span
                                          className={`inline-block whitespace-nowrap ${
                                            sub.name.length > 23
                                              ? "hover:animate-scroll"
                                              : ""
                                          }`}
                                        >
                                          {sub.name}
                                        </span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  // === Module with no dropdown (direct link) ===
                  <Link
                    href={item.path}
                    onClick={() => {
                      setActive(item.name);
                      setOpenDropdown(null);
                    }}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md max-w-[120px] ${
                      active === item.name
                        ? "bg-[var(--color-primary-hover)] text-[var(--color-on-primary)]"
                        : "hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)]"
                    }`}
                  >
                    <div className="overflow-hidden max-w-[80px]">
                      <span
                        className={`inline-block whitespace-nowrap ${
                          item.name.length > 7 ? "hover:animate-scroll" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            ))}

            {/* === More (...) Button === */}
            {visibleCount < navItems.length && (
              <div
                className="relative"
                onMouseLeave={() => {
                  if (closeTimeoutRef.current)
                    clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = setTimeout(
                    () => setHoveredMoreItem(null),
                    150
                  );
                }}
              >
                <button
                  onClick={() => toggleDropdown("more")}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full hover:bg-[var(--hover-bg)]"
                >
                  ...
                </button>

                <AnimatePresence>
                  {openDropdown === "more" && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={{
                        hidden: { opacity: 0, y: -10 },
                        visible: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -10 },
                      }}
                      transition={{ duration: 0.18, ease: "easeInOut" }}
                      className="absolute -right-2 mt-2 w-56 rounded-md bg-background z-50"
                      style={{ boxShadow: "var(--dropdown-shadow)" }}
                    >
                      {/* Scrollable list of items */}
                      <div className="py-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {navItems.slice(visibleCount).map((item) => (
                          <div
                            key={item.path}
                            className="relative group"
                            onMouseEnter={(e) => {
                              if (closeTimeoutRef.current)
                                clearTimeout(closeTimeoutRef.current);
                              setHoveredMoreItem(item.name);
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              setParentRect(rect);

                              const screenWidth = window.innerWidth;
                              const submenuWidth = 240;
                              const spaceRight = screenWidth - rect.right;
                              const spaceLeft = rect.left;
                              setSubmenuPosition(
                                spaceRight < submenuWidth &&
                                  spaceLeft > submenuWidth
                                  ? "left"
                                  : "right"
                              );
                            }}
                            onMouseLeave={() => {
                              closeTimeoutRef.current = setTimeout(
                                () => setHoveredMoreItem(null),
                                150
                              );
                            }}
                          >
                            {/* Row */}
                            <div className="px-2 py-1 flex justify-between items-center hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-on-primary)] cursor-pointer">
                              <div className="overflow-hidden max-w-[120px]">
                                <span
                                  className={`inline-block whitespace-nowrap ${
                                    item.name.length > 15
                                      ? "hover:animate-scroll"
                                      : ""
                                  }`}
                                >
                                  {item.name}
                                </span>
                              </div>
                              {(item.headings || item.subItems) && (
                                <svg
                                  className="ml-1 h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              )}
                            </div>

                            {/* Submenu Portal */}
                            {(item.headings?.length || item.subItems?.length) >
                              0 && (
                              <SubmenuPortal
                                parentRect={parentRect}
                                item={item}
                                submenuPosition={submenuPosition}
                                isVisible={hoveredMoreItem === item.name}
                                onClose={() => setHoveredMoreItem(null)}
                                setActive={setActive}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition"
            >
              <Settings className="h-5 w-5" />
            </button>

            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }} // 👈 this is the key
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute right-0 mt-2 w-48 bg-background rounded-xl py-2 z-50"
                  style={{ boxShadow: "var(--dropdown-shadow)" }}
                >
                  <Link
                    href="/support"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]"
                  >
                    <Cable className="h-4 w-4 shrink-0" />
                    <span>Support</span>
                  </Link>
                  <Link
                    href="accountSettings"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]"
                  >
                    <ShieldUser className="h-4 w-4 shrink-0" />
                    <span>Account Settings</span>
                  </Link>
                  {isAdmin && (
                    <Link
                      href="appSettings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]"
                    >
                      <BadgeAlert className="h-4 w-4 shrink-0" />
                      <span>App Settings</span>
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* =============== Mobile Menu =============== */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden bg-background px-4 py-4 space-y-4 text-sm font-medium"
            style={{
              borderTopColor: "var(--border-top)",
              height: "calc(100vh - 64px - 40px)",
            }}
          >
            {/* Top Row: Search + Settings */}
            <div className="flex items-center gap-3">
              {/* Search should take most space */}
              <div className="flex-1 min-w-0">
                <SearchBar />
              </div>

              {/* Settings button */}
              <div className="relative shrink-0" ref={settingsRef}>
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition"
                >
                  <Settings className="h-5 w-5" />
                </button>

                {isSettingsOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-background rounded-xl py-2 z-50"
                    style={{ boxShadow: "var(--dropdown-shadow)" }}
                  >
                    <Link
                      href="/support"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]"
                    >
                      <Cable className="h-4 w-4 shrink-0" />
                      <span>Support</span>
                    </Link>
                    <Link
                      href="/accountSettings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]"
                    >
                      <ShieldUser className="h-4 w-4 shrink-0" />
                      <span>Account Settings</span>
                    </Link>
                    {/* Only for admin */}
                    {isAdmin && (
                      <Link
                        href="/appSettings"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]"
                      >
                        <BadgeAlert className="h-4 w-4 shrink-0" />
                        <span>App Settings</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Modules */}
            <div
              className="overflow-y-auto max-h-[calc(100vh-64px-38px)] px-4 py-4 space-y-4"
              onWheel={(e) => {
                const el = e.currentTarget;
                const atTop = el.scrollTop === 0 && e.deltaY < 0;
                const atBottom =
                  el.scrollHeight - el.scrollTop === el.clientHeight &&
                  e.deltaY > 0;
                if (atTop || atBottom) e.preventDefault(); // prevent body scroll
              }}
              onTouchMove={(e) => e.stopPropagation()} // mobile
            >
              {navItems.map((item) => (
                <div key={item.path} className="space-y-1">
                  {/* Module button */}
                  <button
                    onClick={() =>
                      setOpenMobileDropdown(
                        openMobileDropdown === item.name ? null : item.name
                      )
                    }
                    className="flex justify-between w-full text-left px-3 py-2 rounded-md hover:bg-[var(--hover-bg)] items-center max-w-full"
                  >
                    <div className="overflow-hidden max-w-[230px]">
                      <span
                        className={`inline-block whitespace-nowrap ${
                          item.name.length > 42 ? "auto-scroll" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    {item.headings || item.subItems ? (
                      <svg
                        className={`ml-2 h-4 w-4 transition-transform ${
                          openMobileDropdown === item.name ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    ) : null}
                  </button>

                  {/* Module dropdown */}
                  {openMobileDropdown === item.name &&
                    (item.headings || item.subItems) && (
                      <div className="pl-4 space-y-2">
                        {/* Headings + subItems */}
                        {item.headings &&
                          item.headings.map((heading) => (
                            <div key={heading.title} className="space-y-1">
                              <p className="flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 whitespace-break-spaces max-w-full">
                                {heading.icon && (
                                  <heading.icon className="h-4 w-4 mr-2" />
                                )}
                                {heading.title}
                              </p>
                              <div className="space-y-1 max-w-full">
                                {heading.subItems.map((sub) => (
                                  <Link
                                    key={sub.path}
                                    href={sub.path}
                                    onClick={() => {
                                      setActive(item.name);
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center px-2 py-1 rounded hover:bg-[var(--hover-bg)] overflow-hidden"
                                  >
                                    {sub.icon && (
                                      <sub.icon className="h-4 w-4 mr-2 shrink-0 z-50" />
                                    )}
                                    <div className="relative overflow-hidden flex-1">
                                      <span
                                        className={`inline-block whitespace-nowrap ${
                                          sub.name.length > 35
                                            ? "auto-scroll"
                                            : ""
                                        }`}
                                      >
                                        {sub.name}
                                      </span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}

                        {/* SubItems without heading */}
                        {item.subItems &&
                          item.subItems.map((sub) => (
                            <Link
                              key={sub.path}
                              href={sub.path}
                              onClick={() => {
                                setActive(item.name);
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex items-center px-2 py-1 text-sm rounded hover:bg-[var(--hover-bg)] overflow-hidden"
                            >
                              {sub.icon && (
                                <sub.icon className="h-4 w-4 mr-2 shrink-0 z-50" />
                              )}
                              <div className="relative overflow-hidden flex-1">
                                <span
                                  className={`inline-block whitespace-nowrap ${
                                    sub.name.length > 12 ? "auto-scroll" : ""
                                  }`}
                                >
                                  {sub.name}
                                </span>
                              </div>
                            </Link>
                          ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Page;
