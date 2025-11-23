"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

interface CollapsibleSidebarProps {
  categories: Category[]
  selected: string
  onSelect: (id: string) => void
}

export function CollapsibleSidebar({ categories, selected, onSelect }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col bg-card border-r border-border overflow-y-auto">
          {/* Close button for mobile */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-card/95 backdrop-blur-sm lg:hidden">
            <h2 className="font-semibold text-foreground">Categories</h2>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Desktop header */}
          <div className="hidden lg:block sticky top-0 z-10 p-4 border-b border-border bg-card/95 backdrop-blur-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</h2>
          </div>

          {/* Category items */}
          <nav className="flex-1 space-y-1 p-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onSelect(category.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  selected === category.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-transparent hover:bg-muted text-foreground"
                }`}
              >
                <span className="text-lg flex-shrink-0">{category.icon}</span>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium text-sm">{category.name}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    selected === category.id ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 left-4 z-40 lg:hidden p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <ChevronLeft className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
    </>
  )
}
