import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-background border-t py-2 shadow-md flex justify-center gap-30"
    style={{borderTopColor: "var(--border-top)"}}>
      <div>
        <p className="text-center text-xs text-gray-400">
          © 2025 My App. All rights reserved.
        </p>
      </div>
      <div>
        <div className="flex justify-center gap-10">
          <Link href="/terms" className="text-center text-xs text-gray-400">
            Terms
          </Link>
          <Link href="/privacy" className="text-center text-xs text-gray-400">
              Privacy
          </Link>
        </div>
      </div>
      <div>
        <Link href="/support">
          <p className="text-center text-xs text-gray-400">
            Connect to Support
          </p>
        </Link>
      </div>
      <div>
        <p className="text-center text-xs text-gray-400">v1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;



