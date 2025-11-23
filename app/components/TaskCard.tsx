"use client"

import { useState } from "react"
import { Button } from "./ui/button"

interface Task {
  id: number
  title: string
  category: string
  completed: boolean
  reminder: boolean
  dueDate: string
  time: string
}

interface TaskCardProps {
  task: Task
  onToggle: () => void
  onDelete: () => void
  onEdit: (task: any) => void
}

export function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const categoryEmojis: Record<string, string> = {
    work: "💼",
    personal: "👤",
    health: "💪",
  }

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit({ title: editTitle })
      setIsEditing(false)
    }
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div
      className={`group rounded-xl border transition-all duration-200 ${
        task.completed
          ? "bg-card/50 border-border/30 opacity-70"
          : "bg-card border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
      }`}
    >
      <div className="flex items-start gap-4 p-4 sm:p-5">
        {/* Checkbox */}
        <button onClick={onToggle} className="mt-1 flex-shrink-0">
          <div
            className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
              task.completed ? "bg-primary border-primary" : "border-muted-foreground/30 hover:border-primary"
            }`}
          >
            {task.completed && <span className="text-sm text-primary-foreground">✓</span>}
          </div>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                autoFocus
              />
              <Button onClick={handleSaveEdit} size="sm" className="bg-primary hover:bg-primary/90">
                Save
              </Button>
              <Button
                onClick={() => {
                  setEditTitle(task.title)
                  setIsEditing(false)
                }}
                size="sm"
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <p
              className={`font-medium transition-all duration-200 ${
                task.completed ? "line-through text-muted-foreground" : "text-foreground"
              }`}
            >
              {task.title}
            </p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-lg">{categoryEmojis[task.category]}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
              {formatDate(task.dueDate)}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
              🕐 {task.time}
            </span>
            {task.reminder && (
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-1">
                🔔 Reminder
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            title="Edit task"
          >
            ✎
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors duration-200"
            title="Delete task"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
