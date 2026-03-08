import { Link } from "react-router-dom";
import { categories } from "@/data/products";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-white">
      <div className="container py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link to="/" className="inline-flex items-center gap-1 text-2xl font-bold">
              <span className="text-[#FFE141]">blink</span>
              <span className="text-[#0C831F]">it</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Fast drinks delivery with a clean, lightweight UI.
            </p>
            <div className="text-xs text-muted-foreground">
              © {year} blinkit-lite. All rights reserved.
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Shop</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {categories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/?category=${encodeURIComponent(c.slug)}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Help</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-foreground">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Search products
                </Link>
              </li>
              <li>
                <a
                  className="text-muted-foreground hover:text-foreground"
                  href="mailto:support@blinkit-lite.local"
                >
                  Contact support
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Legal</p>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Privacy policy</span>
              </li>
              <li>
                <span className="text-muted-foreground">Terms of service</span>
              </li>
              <li>
                <span className="text-muted-foreground">Refund policy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

