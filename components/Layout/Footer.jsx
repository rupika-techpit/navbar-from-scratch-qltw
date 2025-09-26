import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-background border-t border-gray-200 dark:border-gray-700 py-2 shadow-md flex justify-center gap-8">
      <div>
        <p className="text-center text-xs text-foreground">
          © 2025 My App. All rights reserved.
        </p>
      </div>
      <div>
        <div className="flex justify-center gap-2">
          <Link href="/terms" className="text-center text-xs text-foreground">
            Terms
          </Link>
          <Link href="/privacy" className="text-center text-xs text-foreground">
              Privacy
          </Link>
        </div>
      </div>
      <div>
        <Link href="/support">
          <p className="text-center text-xs text-foreground">
            Support
          </p>
        </Link>
      </div>
      <div>
        <p className="text-center text-xs text-foreground">V-1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;



