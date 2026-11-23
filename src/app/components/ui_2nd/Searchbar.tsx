import { Search } from "lucide-react";
import React from "react";

interface SearchbarProps {
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export function Searchbar({placeholder, className = "", value, onChange, type = "text"}: SearchbarProps) {
    return (
      <div className="relative">
          <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`pl-10 pr-3 h-10 w-full bg-slate-50 rounded-xl border border-border focus:outline-none focus:ring-0 focus:border-border
                  ${className}`}
          />
      </div>
    );
}

export default Searchbar;