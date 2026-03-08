import { useSearchParams } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";
import { categories as fallbackCategories, products as fallbackProducts } from "@/data/products";

const ITEMS_PER_PAGE = 12;

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || null;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const setPage = (newPage: number) => {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        if (newPage === 1) {
          p.delete("page");
        } else {
          p.set("page", newPage.toString());
        }
        return p;
      },
      { replace: true }
    );
  };

  const productsSectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  const effectiveCategory = categoryParam ?? selectedCategory;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (categoryParam) {
      setPage(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam]);

  const { data: categoriesData, isError: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const { data, isLoading, isError: productsError } = useQuery({
    queryKey: ["products", page, searchQuery, effectiveCategory],
    queryFn: () =>
      api.getProducts({
        page,
        limit: ITEMS_PER_PAGE,
        search: searchQuery || undefined,
        category: effectiveCategory || undefined,
      }),
    retry: 1,
  });

  const useFallback = categoriesError || productsError;
  const categories = Array.isArray(categoriesData) ? categoriesData : fallbackCategories;

  const { products, pagination } = useMemo(() => {
    if (!useFallback && data) {
      return { products: data.products, pagination: data.pagination };
    }
    let filtered = fallbackProducts;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (effectiveCategory) {
      filtered = filtered.filter((p) => p.categorySlug === effectiveCategory);
    }
    const total = filtered.length;
    const start = (page - 1) * ITEMS_PER_PAGE;
    return {
      products: filtered.slice(start, start + ITEMS_PER_PAGE),
      pagination: {
        page,
        limit: ITEMS_PER_PAGE,
        total,
        totalPages: Math.ceil(total / ITEMS_PER_PAGE),
      },
    };
  }, [useFallback, data, page, searchQuery, effectiveCategory]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container py-6 space-y-8 flex-1">
        {/* Hero Banner */}
        {!searchQuery && (
          <div className="relative overflow-hidden rounded-2xl group">
            <img
              src="/banner.jpg"
              alt="Fresh Juices and Drinks Banner"
              className="w-full h-[220px] md:h-[260px] lg:h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex items-center px-6 md:px-10">
              <div className="max-w-xl space-y-4 text-left text-white drop-shadow-lg">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  Stock up on <span className="text-[#FFE141]">drinks</span>
                </h1>
                <p className="text-base md:text-lg text-gray-100 font-medium max-w-md">
                  Refresh with a selection of juices, smoothies, teas &amp; more.
                </p>
                <button
                  onClick={() =>
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center rounded-xl bg-[#0C831F] px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-[#0a6b28] transition-all hover:scale-105 active:scale-95"
                >
                  Shop now
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Categories */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-foreground">Shop by Category</h2>
          <CategoryGrid categories={categories} />
        </section>

        {/* Product listing */}
        <section id="products" ref={productsSectionRef} className="scroll-mt-24">
          {useFallback && (
            <div className="mb-4 rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-2 text-sm text-amber-800 dark:text-amber-200">
              <strong>Demo mode:</strong> Backend not connected. Using sample data.{" "}
              <span className="text-muted-foreground">
                Start the backend with <code className="rounded bg-muted px-1">cd backend && npm run seed && npm run dev</code> for full features (cart, orders).
              </span>
            </div>
          )}

          {(searchQuery || effectiveCategory) && pagination && (
            <p className="mb-4 text-sm text-muted-foreground">
              {searchQuery ? (
                <>Showing results for "<span className="font-semibold text-foreground">{searchQuery}</span>" ({pagination.total} items)</>
              ) : (
                <>Showing <span className="font-semibold text-foreground">{categories.find(c => c.slug === effectiveCategory)?.name ?? effectiveCategory}</span> ({pagination.total} items)</>
              )}
            </p>
          )}

          {isLoading && !useFallback ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {products.length === 0 && (
                <div className="py-20 text-center text-muted-foreground">
                  <p className="text-lg font-semibold">No products found</p>
                  <p className="text-sm">Try a different search or category</p>
                </div>
              )}

              {pagination && pagination.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground disabled:opacity-40 hover:bg-muted"
                  >
                    Previous
                  </button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${page === i + 1
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    disabled={page >= pagination.totalPages}
                    onClick={() => setPage(page + 1)}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground disabled:opacity-40 hover:bg-muted"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
