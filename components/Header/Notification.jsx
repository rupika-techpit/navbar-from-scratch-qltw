
"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { DropdownItem } from "../UI/dropdown/dropdownList";
import { Trash2, Bell } from "lucide-react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [filter, setFilter] = useState("all");
  const bellRef = useRef(null);
  const dropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Terry Franci",
      message: "requested permission to change",
      project: "Project - Nganter App",
      type: "Project",
      time: "5 min ago",
      minutesAgo: 5,
      read: false,
    },
    {
      id: 2,
      name: "Alena Franci",
      message: "added a new document",
      project: "Project - ResearchX",
      type: "Document",
      time: "8 min ago",
      minutesAgo: 8,
      read: false,
    },
    {
      id: 3,
      name: "Brandon Philips",
      message: "commented on your task",
      project: "Project - DesignPro",
      type: "Task",
      time: "1 hr ago",
      minutesAgo: 60,
      read: true,
    },
    {
      id: 4,
      name: "Sophia Loren",
      message: "assigned you a new task",
      project: "Project - AI Engine",
      type: "Task",
      time: "2 hrs ago",
      minutesAgo: 120,
      read: false,
    },
    {
      id: 5,
      name: "David Warner",
      message: "uploaded new files",
      project: "Project - CloudHub",
      type: "File",
      time: "3 hrs ago",
      minutesAgo: 180,
      read: false,
    },
  ]);

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setHasOpened(true);
      return next;
    });
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        bellRef.current &&
        !bellRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = hasOpened ? 0 : notifications.filter((n) => !n.read).length;

  const removeNotification = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  const clearAll = () => setNotifications([]);
  const markAsRead = (id) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const filteredNotifications = [...notifications]
    .filter((n) => (filter === "unread" ? !n.read : true))
    .sort((a, b) => a.minutesAgo - b.minutesAgo);

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        ref={bellRef}
        className="relative w-7 h-7 flex items-center justify-center rounded-full hover:bg-[var(--hover-bg)] transition"
        onClick={toggleDropdown}
      >
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-1 z-10 flex h-3 w-3 items-center justify-center rounded-full bg-orange-400 text-[11px] font-bold text-white">
            {unreadCount}
            <span className="absolute inline-flex w-full h-full rounded-full bg-orange-400 opacity-75 animate-ping"></span>
          </span>
        )}
        <Bell className="h-6 w-6" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-4 flex max-h-[480px] w-[300px] sm:w-[390px] flex-col rounded-2xl bg-background p-3 shadow-2xl dark:bg-background z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-color dark:border-color">
            <h5 className="text-lg font-semibold text-foreground">Notifications</h5>
            <div className="flex items-center gap-3">
              {notifications.length > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[15px] text-blue-500 hover:text-blue-600"
                >
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-sm text-red-400 hover:text-red-600"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-[var(--hover-bg)] text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === "unread"
                  ? "bg-blue-500 text-white"
                  : "bg-[var(--hover-bg)] text-foreground"
              }`}
            >
              Unread
            </button>
          </div>

          {/* Notifications list */}
          <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
            {filteredNotifications.length === 0 ? (
              <li className="p-4 text-center text-gray-500 dark:text-gray-400">
                No notifications
              </li>
            ) : (
              filteredNotifications.map((n) => (
                <li
                  key={n.id}
                  className={`flex items-start justify-between ${
                    !n.read ? "bg-[var(--unread-bg)]" : ""
                  }`}
                >
                  <DropdownItem
                    onItemClick={() => markAsRead(n.id)}
                    className="flex flex-1 gap-3 rounded-lg border-b border-[var(--border-all)] p-3 hover:bg-[var(--hover-bg)]"
                  >
                    <span className="block">
                      <span className="block mb-1.5 space-x-1 text-sm">
                        <span className="font-medium text-[var(--foreground)]">
                          {n.name}
                        </span>
                        <span className="text-[var(--muted-foreground)]">
                          {n.message}
                        </span>
                        <span className="font-medium text-[var(--foreground)]">
                          {n.project}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                        <span>{n.type}</span>
                        <span className="w-1 h-1 bg-[var(--muted-foreground)] rounded-full"></span>
                        <span>{n.time}</span>
                      </span>
                    </span>
                  </DropdownItem>

                  <button
                    onClick={() => removeNotification(n.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))
            )}
          </ul>

          {/* View all */}
          <Link
            href="/notifications"
            className="block px-4 py-2 mt-3 text-sm font-medium text-center text-foreground bg-background border border-gray-300 rounded-lg hover:bg-[var(--hover-bg)] dark:border-gray-700 dark:bg-background dark:text-foreground dark:hover:bg-[var(--hover-bg)]"
          >
            View All Notifications
          </Link>
        </div>
      )}
    </div>
  );
}



 
 
