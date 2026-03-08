import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, Clock, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { state } = useCart();
  const order = state.orders.find((o) => o.id === orderId);

  const itemCount = order
    ? order.items.reduce((sum, i) => sum + i.quantity, 0)
    : 0;
  const placedAt = order ? new Date(order.date) : null;
  const eta =
    placedAt && !Number.isNaN(placedAt.getTime())
      ? new Date(placedAt.getTime() + 15 * 60 * 1000)
      : null;

  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    if (!eta) {
      setRemainingSeconds(null);
      return;
    }
    const update = () => {
      const diff = Math.max(0, Math.floor((eta.getTime() - Date.now()) / 1000));
      setRemainingSeconds(diff);
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [eta?.getTime()]);

  const formattedCountdown =
    remainingSeconds !== null
      ? `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(
          remainingSeconds % 60
        ).padStart(2, "0")}`
      : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container flex flex-1 flex-col items-center py-16 text-center space-y-6 animate-slide-up">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Order Placed! 🎉</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Order ID: <span className="font-mono font-semibold text-foreground">{orderId}</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your order has been confirmed and is being prepared for delivery.
          </p>
        </div>

        {order ? (
          <div className="w-full max-w-3xl grid gap-6 md:grid-cols-[2fr,1.4fr] text-left">
            <div className="space-y-4 rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Order summary</h3>
                    <p className="text-xs text-muted-foreground">
                      {itemCount} item{itemCount === 1 ? "" : "s"} • Total ₹{order.total}
                    </p>
                  </div>
                  {eta && (
                    <div className="hidden md:flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-800">
                      <Truck className="h-3.5 w-3.5" />
                      <span>
                        Est. {eta.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  )}
                </div>

                {formattedCountdown && (
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 flex items-center justify-between gap-4 text-left">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-emerald-700" />
                      <div>
                        <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                          Estimated delivery
                        </p>
                        <p className="text-[11px] text-emerald-700">
                          ~15 minutes from confirmation
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-mono font-bold text-emerald-800">
                        {formattedCountdown}
                      </p>
                      <p className="text-[11px] text-emerald-700">minutes remaining</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {order.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center justify-between text-sm">
                    <div className="flex flex-col">
                      <span className="text-foreground">{product.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {product.unit} • Qty {quantity}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">
                      ₹{product.price * quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-3 space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Item total</span>
                  <span>₹{order.total}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery fee</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground text-base">
                  <span>To pay</span>
                  <span>₹{order.total}</span>
                </div>
                {placedAt && (
                  <p className="text-[11px] text-muted-foreground">
                    Ordered on {placedAt.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5 space-y-3 text-sm">
                <h3 className="text-sm font-semibold text-foreground">Delivery details</h3>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll deliver to your saved address. You can update your address in the app
                  before your next order.
                </p>
                <div className="mt-1 text-xs text-muted-foreground">
                  <p>Contactless doorstep delivery</p>
                  <p>Rider will call you on arrival at your location.</p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 space-y-3 text-sm">
                <h3 className="text-sm font-semibold text-foreground">Payment</h3>
                <p className="text-xs text-muted-foreground">
                  Paid at delivery • Cash / UPI accepted
                </p>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center justify-between">
                    <span>Order status</span>
                    <span className="font-semibold text-emerald-600">Confirmed</span>
                  </p>
                  <p>
                    We are packing your order. You&apos;ll get a notification when it is out for
                    delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t find this order in your recent orders.
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
