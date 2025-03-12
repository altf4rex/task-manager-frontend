"use client";

import { useRouter, useParams } from "next/navigation";
import TaskModal from "../../../../components/TaskModal";
import { useStore } from "@/store/taskStore";
import { useEffect, useState } from "react";

export default function EditTaskModalPage() {
  const router = useRouter();
  const { taskId } = useParams();
  const { tasks } = useStore();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id.toString() === taskId);
    if (foundTask) setTask(foundTask);
  }, [taskId, tasks]);

  if (!task) return null;

  return (
    <TaskModal
      open={true}
      task={task}
      onClose={() => router.back()}
    />
  );
}
