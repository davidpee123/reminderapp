"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"

interface AddTaskModalProps {
  onClose: () => void
  onAdd: (task: any) => void
}

export function AddTaskModal({ onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("work")
  const [dueDate, setDueDate] = useState("")
  const [time, setTime] = useState("09:00")
  const [reminder, setReminder] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        category,
        dueDate: dueDate || new Date().toISOString().split("T")[0],
        time,
        reminder,
        completed: false,
      })
      setTitle("")
      setCategory("work")
      setDueDate("")
      setTime("09:00")
      setReminder(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-2xl">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-bold text-foreground">Add New Task</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Title Input */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              autoFocus
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="work">💼 Work</option>
              <option value="personal">👤 Personal</option>
              <option value="health">💪 Health</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Time Input */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Reminder Toggle */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <button
              type="button"
              onClick={() => setReminder(!reminder)}
              className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                reminder ? "bg-primary border-primary" : "border-muted-foreground/30 hover:border-primary"
              }`}
            >
              {reminder && <span className="text-sm text-primary-foreground">✓</span>}
            </button>
            <label className="text-sm font-medium text-foreground cursor-pointer">Set reminder for this task</label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              Add Task
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="flex-1 border-border hover:bg-muted/50 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
