'use client';

import React, { useState } from 'react';
import { Task } from './TaskBoard';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

const statuses = ['Not Started', 'In Progress', 'Blocked', 'Done'];

export default function TaskModal({ task, onClose, onUpdate }: TaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    onUpdate({ ...task, title, description, status });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Task Details</h2>

        <label className="block mb-2 font-semibold dark:text-gray-200">Title:</label>
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-slate-600 rounded px-3 py-2 mb-4
                     dark:bg-slate-700 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mb-2 font-semibold dark:text-gray-200">Description:</label>
        <textarea
          className="w-full border border-gray-300 dark:border-slate-600 rounded px-3 py-2 mb-4
                     dark:bg-slate-700 dark:text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block mb-2 font-semibold dark:text-gray-200">Status:</label>
        <select
          className="w-full border border-gray-300 dark:border-slate-600 rounded px-3 py-2 mb-4
                     dark:bg-slate-700 dark:text-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400
                       dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSave();
              onClose();
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

