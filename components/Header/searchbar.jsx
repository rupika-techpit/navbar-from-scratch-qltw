"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const mockData = [
  {
    id: 1,
    // header: "Dashboard",
    title: "Dashboard Overview",
    content: "Quick overview of all key metrics in your workspace.",
    link: "/dashboard",
    source: "Internal System",
  },
  {
    id: 2,
    // header: "Reports",
    title: "Marketing Report",
    content: "Detailed analysis of recent campaigns and performance.",
    link: "/dashboard/subModule",
    source: "Marketing Dept.",
  },
  {
    id: 3,
    // header: "Analytics",
    title: "Sales Analytics",
    content: "Breakdown of sales performance, revenue trends, and KPIs.",
    link: "/dashboard/sales",
    source: "Sales Dashboard",
  },
  {
    id: 4,
    // header: "Reports",
    title: "Operations Security",
    content: "Security and compliance monitoring for operations.",
    link: "/report/security",
    source: "Operations Team",
  },
  {
    id: 5,
    // header: "Analytics",
    title: "User Analytics",
    content: "User engagement, activity, and retention data.",
    link: "/analytics/basic",
    source: "Analytics Hub",
  },
  {
    id: 6,
    // header: "Analytics",
    title: "Enterprise Analytics",
    content: "Advanced insights for enterprise-level performance.",
    link: "/analytics/enterprise",
    source: "Enterprise Data",
  },
  {
    id: 7,
    // header: "Forms",
    title: "Case Study 1",
    content: "Real-world study on workflow efficiency improvements.",
    link: "/forms/case1",
    source: "Case Studies",
  },
  {
    id: 8,
    // header: "Team",
    title: "Team Insights",
    content: "Collaboration, productivity, and team activity breakdown.",
    link: "/analytic/team",
    source: "HR Analytics",
  },
];


const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = mockData
    .filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className="relative w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2">
      {/* Input */}
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
      <input
        type="text"
        placeholder="Global Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        className="w-full pl-9 pr-3 py-2 rounded-lg 
                   border bg-background text-foreground text-sm 
                   focus:outline-none focus:ring-2 focus:ring-[var(--border-color)]"
        style={{ borderColor: "var(--border-color)" }}
      />

      {/* Dropdown */}
      {isFocused && query && (
        <div
          className="absolute mt-1 w-full bg-background rounded-lg shadow-lg z-50"
          style={{ border: "1px solid var(--border-color)", boxShadow: "var(--dropdown-shadow)" }}
        >
          <ul className="max-h-60 overflow-y-auto text-sm">
            {results.length > 0 ? (
              results.map((item) => (
                <li key={item.id} className="px-4 py-2 hover:bg-[var(--hover-bg)]">
                  <Link href={item.link}>
                    {/* <p className="text-xs text-gray-500">{item.header}</p> */}
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{item.content}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Source: {item.source}</p>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-[var(--muted-foreground)]">
                No results found
              </li>
            )}
          </ul>

          {/* See all results */}
          {results.length > 0 && (
            <div style={{ borderTop: "1px solid var(--border-color)" }}>
              <Link
                href={`/search?query=${query}`}
                className="block px-4 py-2 text-blue-500 hover:bg-[var(--hover-bg)]"
              >
                🔍 See all results
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
