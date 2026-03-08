import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { state, updateQuantity, removeItem, placeOrder, cartTotal } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const order = placeOrder();
      if (order) navigate(`/order/${order.id}`);
      setPlacing(false);
    }, 800);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="container flex flex-1 flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/40" />
          <h2 className="text-xl font-bold text-foreground">Your cart is empty</h2>
          <p className="mt-1 text-sm text-muted-foreground">Add some drinks to get started</p>
          <Link
            to="/"
            className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Browse Drinks
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container py-6 space-y-6 flex-1">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>

        <h2 className="text-2xl font-bold text-foreground">Your Cart ({state.items.length} items)</h2>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            {state.items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-xl border border-border bg-card p-4 animate-fade-in"
              >
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <Link to={`/product/${product.id}`} className="text-sm font-semibold text-foreground truncate">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{product.unit}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-lg border border-border">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-muted rounded-l-lg"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[28px] text-center text-sm font-bold text-foreground">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-muted rounded-r-lg"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-foreground">₹{product.price * quantity}</span>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-primary font-medium">FREE</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground text-base">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {placing ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
