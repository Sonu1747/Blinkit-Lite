import { Link } from "react-router-dom";
import type { Category } from "@/data/products";

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          to={`/category/${cat.slug}`}
          className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-all hover:shadow-md hover:bg-card"
        >
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${cat.color} text-3xl transition-transform group-hover:scale-110`}>
            {cat.image}
          </div>
          <span className="text-center text-xs font-medium text-foreground leading-tight">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
