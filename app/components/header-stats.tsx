interface HeaderStatsProps {
  totalTasks: number
  completedTasks: number
  dueTodayTasks: number
}

export function HeaderStats({ totalTasks, completedTasks, dueTodayTasks }: HeaderStatsProps) {
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="hidden md:flex items-center gap-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg px-6 py-4 border border-primary/10">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-foreground">{totalTasks}</span>
        <span className="text-xs text-muted-foreground">Total Tasks</span>
      </div>
      <div className="h-8 w-px bg-border" />
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">{completedTasks}</span>
          <span className="text-xs text-muted-foreground">/ {totalTasks}</span>
        </div>
        <span className="text-xs text-muted-foreground">Completed</span>
      </div>
      <div className="h-8 w-px bg-border" />
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-accent">{dueTodayTasks}</span>
        <span className="text-xs text-muted-foreground">Due Today</span>
      </div>

      {/* Progress Bar */}
      <div className="hidden lg:block w-24">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
