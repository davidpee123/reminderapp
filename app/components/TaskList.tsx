"use client"
import { TaskCard } from "@/app/components/TaskCard"

interface Task {
  id: number
  title: string
  category: string
  completed: boolean
  reminder: boolean
  dueDate: string
}

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, task: any) => void
}

export function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-card border border-border/50 p-4">
          <p className="text-xs text-muted-foreground font-medium">Total Tasks</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{totalCount}</p>
        </div>
        <div className="rounded-xl bg-card border border-border/50 p-4">
          <p className="text-xs text-muted-foreground font-medium">Completed</p>
          <p className="mt-2 text-2xl font-bold text-primary">{completedCount}</p>
        </div>
        <div className="rounded-xl bg-card border border-border/50 p-4 col-span-2 sm:col-span-1">
          <p className="text-xs text-muted-foreground font-medium">Progress</p>
          <p className="mt-2 text-2xl font-bold text-primary">
            {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-xl bg-card border border-border/50 p-12 text-center">
            <p className="text-2xl mb-2">📭</p>
            <p className="text-muted-foreground">No tasks yet. Create one to get started!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => onToggle(task.id)}
              onDelete={() => onDelete(task.id)}
              onEdit={(updatedTask) => onEdit(task.id, updatedTask)}
            />
          ))
        )}
      </div>
    </div>
  )
}
