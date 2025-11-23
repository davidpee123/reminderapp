 "use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"

interface HeaderSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function HeaderSearch({ onSearch, placeholder = "Search tasks..." }: HeaderSearchProps) {
  const [query, setQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-lg bg-input pl-10 pr-10 py-2 text-sm text-foreground placeholder:text-muted-foreground border border-border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
