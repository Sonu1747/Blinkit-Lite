import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";

export default function CategoryPage() {
  const { slug } = useParams();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => api.getProducts({ category: slug || "", limit: 100 }),
    enabled: !!slug,
  });

  const category = categories.find((c) => c.slug === slug);
  const products = data?.products ?? [];

  if (!slug) {
    return null;
  }

  if (!category && !isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="container py-20 text-center text-muted-foreground flex-1">
          Category not found
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container py-6 space-y-6 flex-1">
        {category && (
          <div className="flex items-center gap-3">
            <span className="text-4xl">{category.image}</span>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
              <p className="text-sm text-muted-foreground">{products.length} products</p>
            </div>
          </div>
        )}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
