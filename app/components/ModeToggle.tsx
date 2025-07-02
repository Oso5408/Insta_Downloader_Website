"use client";
import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(event: MouseEvent | TouchEvent) {
      if (open && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (open && event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer relative"
        aria-label="Toggle theme menu"
        tabIndex={0}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Sun className={`h-5 w-5 transition-all ${theme === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"}`} />
        <Moon className={`h-5 w-5 transition-all absolute ${theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"}`} />
        <span className="sr-only">Toggle theme</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => { setTheme("light"); setOpen(false); }}
            tabIndex={0}
          >
            Light
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => { setTheme("dark"); setOpen(false); }}
            tabIndex={0}
          >
            Dark
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => { setTheme("system"); setOpen(false); }}
            tabIndex={0}
          >
            System
          </button>
        </div>
      )}
    </div>
  );
} 