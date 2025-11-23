"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface HeaderSortProps {
  onSort: (sortBy: string) => void
}

export function HeaderSort({ onSort }: HeaderSortProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState("due-date")

  const sortOptions = [
    { id: "due-date", label: "Due Date" },
    { id: "created", label: "Recently Added" },
    { id: "name", label: "Task Name (A-Z)" },
    { id: "priority", label: "Completed First" },
  ]

  const handleSelect = (id: string) => {
    setSelected(id)
    onSort(id)
    setIsOpen(false)
  }

  const selectedLabel = sortOptions.find((opt) => opt.id === selected)?.label || "Sort by"

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg bg-input px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-card transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {selectedLabel}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                selected === option.id ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-secondary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
