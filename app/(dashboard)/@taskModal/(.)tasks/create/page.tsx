"use client";

import { useRouter } from "next/navigation";
import CreateTaskModal from "../../../../components/CreateTaskModal";

export default function CreateTaskModalPage() {
  const router = useRouter();

  return (
    <CreateTaskModal
      open={true}
      onClose={() => router.back()}
    />
  );
}
