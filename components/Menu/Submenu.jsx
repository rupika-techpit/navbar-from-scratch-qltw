"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SubmenuPortal({
  parentRect,
  item,
  submenuPosition,
  isVisible,
  onClose,
  setActive,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isVisible) return null;

  // Dynamic top to prevent flyout going offscreen
  const submenuHeight = 240;
  const viewportHeight = window.innerHeight;
  let top = parentRect.bottom;
  // If submenu overflows bottom, move it up just enough
  if (top + submenuHeight > viewportHeight) {
    const overflow = top + submenuHeight - viewportHeight;
    top = Math.max(parentRect.top - overflow, 0); // move up by the overflow amount
  }

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: submenuPosition === "right" ? 8 : -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: submenuPosition === "right" ? 8 : -8 }}
          transition={{ duration: 0.18 }}
          style={{
            position: "fixed",
            top,
            left:
              submenuPosition === "right"
                ? parentRect.right + 4
                : parentRect.left - 240 - 4, // 240 = submenu width
            width: 240,
            zIndex: 9999,
          }}
          className="bg-background rounded-md shadow-lg"
          onMouseEnter={() => {
            if (closeTimeoutRef?.current) clearTimeout(closeTimeoutRef.current);
          }}
          onMouseLeave={onClose}
        >
          <div className="py-2">
            {/* Headings */}
            {item.headings?.map((heading) => (
              <div key={heading.title} className="px-4 py-2">
                <p className="flex items-center text-xs font-semibold text-gray-500 uppercase mb-1">
                  {heading.icon && <heading.icon className="h-4 w-4 mr-2" />}
                  {heading.title}
                </p>
                <div className="space-y-1">
                  {heading.subItems?.map((sub) => (
                    <Link
                      key={sub.path}
                      href={sub.path}
                      onClick={() => {
                        setActive(item.name);
                        onClose();
                      }}
                      className="flex items-center px-2 py-1 text-sm rounded hover:bg-[var(--color-tertiary-hover)] hover:text-[var(--color-on-tertiary)]"
                    >
                      {sub.icon && <sub.icon className="h-4 w-4 mr-2 shrink-0" />}
                      <span className="truncate">{sub.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Simple subitems */}
            {item.subItems?.map((sub) => (
              <Link
                key={sub.path}
                href={sub.path}
                onClick={() => {
                  setActive(item.name);
                  onClose();
                }}
                className="block px-4 py-2 text-sm rounded hover:bg-[var(--hover-bg)] truncate"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
