import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
}

interface NavigationDropdownProps {
  title: string;
  items: DropdownItem[];
  className?: string;
}

export function NavigationDropdown({ title, items, className = "" }: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to prevent flicker when moving between elements
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div 
      className={`relative ${className}`} 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="text-xl font-bold text-pink-700 hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
          {items.map((item, index) => (
            <a
              key={`nav-item-${item.name}-${index}`}
              href={item.href}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200 border-b border-gray-50 last:border-b-0"
              onClick={() => setIsOpen(false)}
            >
              <div className="font-medium text-base">{item.name}</div>
              {item.description && (
                <div className="text-sm text-gray-500 mt-1">{item.description}</div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}