import { Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const { state, addItem, updateQuantity } = useCart();
  const cartItem = state.items.find((i) => i.product.id === product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card p-3 transition-shadow hover:shadow-md animate-fade-in">
      {discount > 0 && (
        <span className="absolute left-2 top-2 z-10 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-secondary-foreground">
          {discount}% OFF
        </span>
      )}
      {!product.inStock && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-card/80">
          <span className="rounded-md bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
            Out of Stock
          </span>
        </div>
      )}
      <Link to={`/product/${product.id}`} className="mb-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.unit}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-foreground">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          {product.inStock && (
            <>
              {cartItem ? (
                <div className="flex items-center gap-1 rounded-lg bg-primary">
                  <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center text-primary-foreground hover:opacity-80"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-[20px] text-center text-sm font-bold text-primary-foreground">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center text-primary-foreground hover:opacity-80"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addItem(product)}
                  className="rounded-lg border border-primary px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-accent"
                >
                  ADD
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
