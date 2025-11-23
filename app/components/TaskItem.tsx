// components/TaskItem.tsx
import React from 'react';

type Task = {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  dueAt: string;
  completed?: boolean;
  updatedAt?: string;
};

type Props = {
  task: Task;
  onToggleComplete: (t: Task) => void;
  onDelete: (t: Task) => void;
};

export default function TaskItem({ task, onToggleComplete, onDelete }: Props) {
  const due = new Date(task.dueAt);
  const now = new Date();
  const isOverdue = !task.completed && due < now;

  return (
    <li className={`p-4 rounded-lg border ${task.completed ? 'bg-gray-50 line-through' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.description}</p>
          <p className="text-xs text-gray-400 mt-2">{due.toLocaleString()}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`text-xs px-2 py-1 rounded ${isOverdue ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{task.category}</span>
          <div className="flex gap-2">
            <button onClick={() => onToggleComplete(task)} className="px-2 py-1 border rounded text-sm">{task.completed ? 'Undo' : 'Done'}</button>
            <button onClick={() => onDelete(task)} className="px-2 py-1 border rounded text-sm text-red-600">Delete</button>
          </div>
        </div>
      </div>
    </li>
  );
}
