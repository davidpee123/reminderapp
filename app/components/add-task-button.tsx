// app/components/add-task-button.tsx
"use client";

import { motion } from "framer-motion";

export function AddTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl transition-all duration-300 flex items-center justify-center text-2xl font-bold"
      title="Add new task"
    >
      +
    </motion.button>
  );
}
