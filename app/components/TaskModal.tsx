"use client";

import React, { useState } from "react";
import { Task } from "./TaskBoard";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

const statuses = ["Not Started", "In Progress", "Blocked", "Done"];

export default function TaskModal({ task, onClose, onUpdate }: TaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    onUpdate({ ...task, title, description, status });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-neutral-800 text-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Task Details</h2>

        <label className="block mb-2 font-semibold">Title:</label>
        <input
          type="text"
          className="w-full border border-neutral-600 bg-neutral-700 p-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mb-2 font-semibold">Description:</label>
        <textarea
          className="w-full border border-neutral-600 bg-neutral-700 p-2 mb-4 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block mb-2 font-semibold">Status:</label>
        <select
          className="w-full border border-neutral-600 bg-neutral-700 p-2 mb-4 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
