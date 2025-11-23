"use client";

import Image from "next/image";

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface CategoryListProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

export function CategoryList({ categories, selected, onSelect }: CategoryListProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
        Categories
      </h2>

      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            selected === category.id
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "bg-card hover:bg-card/80 text-foreground border border-border/50"
          }`}
        >
          {/* Icon */}
          <div className="flex-shrink-0">
            <Image
              src={category.icon} // e.g., "/icons/work.png"
              alt={category.name}
              width={32}
              height={32}
              className="object-contain"
              priority // optional, ensures quick loading
            />
          </div>

          {/* Name */}
          <div className="flex-1 text-left">
            <p className="font-medium text-sm">{category.name}</p>
          </div>

          {/* Count */}
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              selected === category.id ? "bg-primary-foreground/20" : "bg-muted"
            }`}
          >
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
}

