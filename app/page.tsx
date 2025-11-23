"use client"

import { useState, useEffect } from "react"
import { TaskList } from "./components/TaskList"
import { CollapsibleSidebar } from "./components/Collapsible-Sidebar"
import { AddTaskButton } from "./components/add-task-button"
import { AddTaskModal } from "./components/AddTaskModal"
import { OnboardingCarousel } from "./components/OnboardingCarousel"
import { HeaderSearch } from "./components/header-search"
import { HeaderSort } from "./components/header-sort"
import { HeaderSettings } from "./components/header-settings"
import { HeaderStats } from "./components/header-stats"
import { useNotifications } from "@/hooks/use-notification"

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [tasks, setTasks] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("due-date")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  useEffect(() => {
    const savedTasks = localStorage.getItem("taskflow-tasks")
    const hasSeenOnboarding = localStorage.getItem("taskflow-onboarded")

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (error) {
        console.error("[v0] Failed to parse saved tasks:", error)
        setTasks([])
      }
    }

    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }

    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("taskflow-tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  useNotifications(tasks, notificationsEnabled)

  const categories = [
    { id: "all", name: "All Tasks", icon: "📋", count: tasks.length },
    { id: "work", name: "Work", icon: "💼", count: tasks.filter((t) => t.category === "work").length },
    { id: "personal", name: "Personal", icon: "👤", count: tasks.filter((t) => t.category === "personal").length },
    { id: "health", name: "Health", icon: "💪", count: tasks.filter((t) => t.category === "health").length },
  ]

  let filteredTasks = selectedCategory === "all" ? tasks : tasks.filter((t) => t.category === selectedCategory)

  if (searchQuery.trim()) {
    filteredTasks = filteredTasks.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "due-date":
        return new Date(a.dueDate || "9999-12-31").getTime() - new Date(b.dueDate || "9999-12-31").getTime()
      case "created":
        return b.id - a.id
      case "name":
        return a.title.localeCompare(b.title)
      case "priority":
        return (a.completed ? 1 : 0) - (b.completed ? 1 : 0)
      default:
        return 0
    }
  })

  const handleAddTask = (newTask: any) => {
    setTasks([...tasks, { ...newTask, id: Math.max(...tasks.map((t) => t.id), 0) + 1 }])
    setShowAddModal(false)
  }

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleEditTask = (id: number, updatedTask: any) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedTask } : t)))
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const dueTodayCount = tasks.filter((t) => {
    const today = new Date().toISOString().split("T")[0]
    return t.dueDate === today
  }).length

  const handleCompleteOnboarding = () => {
    localStorage.setItem("taskflow-onboarded", "true")
    setShowOnboarding(false)
  }

  const handleResetOnboarding = () => {
    setShowOnboarding(true)
  }

  if (showOnboarding) {
    return <OnboardingCarousel onComplete={handleCompleteOnboarding} />
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Title Row */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">TaskFlow</h1>
                <p className="text-sm text-muted-foreground">Stay organized and productive</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <span className="text-lg">✓</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <HeaderSearch onSearch={setSearchQuery} />
              <HeaderSort onSort={setSortBy} />
              <HeaderSettings
                onNotificationToggle={setNotificationsEnabled}
                notificationsEnabled={notificationsEnabled}
                onResetOnboarding={handleResetOnboarding}
              />
            </div>

            <HeaderStats totalTasks={tasks.length} completedTasks={completedCount} dueTodayTasks={dueTodayCount} />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Collapsible Sidebar */}
        <CollapsibleSidebar categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Tasks Main Area */}
        <div className="flex-1 mx-auto max-w-4xl w-full px-4 py-8 sm:px-6 lg:px-8">
          <TaskList
            tasks={sortedTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        </div>
      </div>

      {/* Floating Action Button */}
      <AddTaskButton onClick={() => setShowAddModal(true)} />

      {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onAdd={handleAddTask} />}
    </main>
  )
}
