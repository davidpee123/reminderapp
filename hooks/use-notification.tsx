"use client"

import { useEffect } from "react"

interface NotificationTask {
  id: number
  title: string
  dueDate: string
  time: string
  reminder: boolean
  completed: boolean
}

export function useNotifications(tasks: NotificationTask[]) {
  useEffect(() => {
    // Request notification permission on mount
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }

    // Check for due tasks every minute
    const interval = setInterval(() => {
      const now = new Date()
      const currentTime = now.toTimeString().slice(0, 5)
      const currentDate = now.toISOString().split("T")[0]

      tasks.forEach((task) => {
        if (
          task.reminder &&
          !task.completed &&
          task.dueDate === currentDate &&
          task.time === currentTime &&
          typeof window !== "undefined" &&
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          new Notification("TaskFlow Reminder", {
            body: `Time for: ${task.title}`,
            icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23FF8C00' width='100' height='100'/><text x='50' y='60' font-size='50' fill='white' text-anchor='middle' font-weight='bold'>✓</text></svg>",
            tag: `task-${task.id}`,
          })
        }
      })
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [tasks])
}
