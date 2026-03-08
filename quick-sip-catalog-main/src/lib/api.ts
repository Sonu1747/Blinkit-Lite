const API_BASE =
  import.meta.env.VITE_API_URL || "https://blinkit-lite.onrender.com/api";

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  color: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string })?.error || res.statusText || "Request failed");
  }
  return res.json();
}

export const api = {
  getCategories: () => fetchApi<Category[]>("/categories"),
  getProducts: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }) => {
    const sp = new URLSearchParams();
    if (params?.page != null) sp.set("page", String(params.page));
    if (params?.limit != null) sp.set("limit", String(params.limit));
    if (params?.search) sp.set("search", params.search);
    if (params?.category) sp.set("category", params.category);
    return fetchApi<ProductsResponse>(`/products?${sp}`);
  },
  getProduct: (id: string) => fetchApi<Product>(`/products/${id}`),
};
