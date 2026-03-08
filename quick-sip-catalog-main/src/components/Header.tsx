import { Link } from "react-router-dom";
import { ShoppingCart, Search, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SEARCH_SUGGESTIONS = [
  "Search soft-drinks",
  "Search Juices",
  "Search Water & Soda",
  "Search Energy Drinks",
  "Search Tea & Coffee",
  "Search Milk Drinks",
  "Search Shakes & Smoothies",
  "Search Health Drinks",
];

export default function Header() {
  const { cartCount, cartTotal } = useCart();
  const [search, setSearch] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % SEARCH_SUGGESTIONS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/?search=${encodeURIComponent(search.trim())}`);
  };

  const showRotatingPlaceholder = !search && !isSearchFocused;
  const hasCartItems = cartCount > 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container flex h-20 min-h-[5rem] items-center gap-6 py-2 sm:h-24 sm:min-h-[6rem] sm:gap-8">
        {/* Left: Logo (text) + Delivery info */}
        <Link to="/" className="flex items-center gap-4 shrink-0">
          <span className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-[#FFE141]">blink</span>
            <span className="text-[#0C831F]">it</span>
          </span>
          <div className="hidden sm:block">
            <p className="text-base font-bold leading-tight text-foreground">
              Delivery in 10 minutes
            </p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              
            </p>
          </div>
        </Link>

        {/* Center: Search bar with rotating placeholder */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-2 sm:mx-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 pl-12 pr-4 text-base text-foreground placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0C831F] focus:border-transparent focus:bg-white"
              placeholder={isSearchFocused ? "Search for drinks..." : ""}
              aria-label="Search products"
            />
            {showRotatingPlaceholder && (
              <div
                className="pointer-events-none absolute inset-y-0 left-12 flex items-center text-base text-gray-500 max-w-[calc(100%-3.5rem)] overflow-hidden"
                aria-hidden
              >
                <span
                  key={placeholderIndex}
                  className="inline-block whitespace-nowrap animate-placeholder-scroll"
                >
                  {SEARCH_SUGGESTIONS[placeholderIndex]}
                </span>
              </div>
            )}
          </div>
        </form>

        {/* Right: My Cart - grey with white text when empty, green when has items */}
        <Link
          to="/cart"
          className={`relative flex items-center gap-2.5 rounded-xl px-5 py-3 text-base font-semibold transition-colors shrink-0 ${
            hasCartItems
              ? "bg-[#0C831F] text-white hover:bg-[#0a6b28]"
              : "bg-gray-400 text-white hover:bg-gray-500"
          }`}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="hidden sm:inline">
            {hasCartItems ? `₹${cartTotal}` : "My Cart"}
          </span>
          {hasCartItems && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0C831F] text-sm font-bold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
