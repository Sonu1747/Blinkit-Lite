import { useParams, Link } from "react-router-dom";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(id!),
    enabled: !!id,
  });
  const { data: relatedData } = useQuery({
    queryKey: ["products", "related", product?.categorySlug],
    queryFn: () => api.getProducts({ category: product!.categorySlug, limit: 10 }),
    enabled: !!product?.categorySlug,
  });
  const { state, addItem, updateQuantity } = useCart();

  const related =
    relatedData?.products.filter((p) => p.id !== product?.id).slice(0, 6) ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="container py-20 flex-1">
          <div className="h-64 w-full max-w-md rounded-2xl bg-muted animate-pulse" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="container py-20 text-center text-muted-foreground flex-1">
          Product not found
        </div>
        <Footer />
      </div>
    );
  }

  const cartItem = state.items.find((i) => i.product.id === product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container py-6 space-y-8 flex-1">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-[480px] overflow-hidden rounded-2xl bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[320px] md:h-[480px] object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Link
                to={`/category/${product.categorySlug}`}
                className="text-xs font-medium text-primary hover:underline"
              >
                {product.category}
              </Link>
              <h1 className="mt-1 text-2xl font-bold text-foreground">{product.name}</h1>
              <p className="text-sm text-muted-foreground">{product.unit}</p>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-sm font-bold text-secondary-foreground">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <div className="shrink-0">
                {product.inStock ? (
                  cartItem ? (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-xl bg-primary">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, cartItem.quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-primary-foreground hover:opacity-80"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[36px] text-center text-sm font-bold text-primary-foreground">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, cartItem.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-primary-foreground hover:opacity-80"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => addItem(product)}
                      className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Add to Cart
                    </button>
                  )
                ) : (
                  <p className="text-sm font-semibold text-destructive">Out of Stock</p>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Why shop from blinkmart? */}
            <div className="mt-6 space-y-3">
              <h2 className="text-sm font-semibold text-foreground">
                Why shop from blinkmart?
              </h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 text-xl">
                    🚚
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">
                      Round the clock delivery
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Get items delivered to your doorstep from nearby dark stores whenever you
                      need them.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-xl">
                    💸
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">
                      Best prices & offers
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Get great prices with offers directly from your favourite brands.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 text-xl">
                    🛒
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">Wide assortment</p>
                    <p className="text-xs text-muted-foreground">
                      Choose from thousands of products across food, personal care, household &
                      more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-bold text-foreground">Similar Drinks</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
