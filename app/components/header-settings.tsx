"use client"

import { Settings, RotateCcw } from "lucide-react"
import { useState } from "react"

interface HeaderSettingsProps {
  onNotificationToggle: (enabled: boolean) => void
  notificationsEnabled?: boolean
  onResetOnboarding?: () => void
}

export function HeaderSettings({
  onNotificationToggle,
  notificationsEnabled = true,
  onResetOnboarding,
}: HeaderSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifs, setNotifs] = useState(notificationsEnabled)

  const handleToggle = () => {
    const newValue = !notifs
    setNotifs(newValue)
    onNotificationToggle(newValue)
  }

  const handleResetOnboarding = () => {
    localStorage.removeItem("taskflow-onboarded")
    onResetOnboarding?.()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-10 w-10 rounded-lg bg-input border border-border text-foreground hover:bg-secondary transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <Settings className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-border bg-card shadow-lg z-50 p-4">
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="font-semibold text-foreground mb-3">Preferences</h3>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Notifications</label>
              <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifs ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifs ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <button
              onClick={handleResetOnboarding}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              View Tutorial Again
            </button>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">Version 1.0 • Made with care</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
