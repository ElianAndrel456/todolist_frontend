import { TaskPriority } from "@/store/task.store";
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, { message: "El titulo es requerido" }),
  completed: z.boolean(),
  description: z.string(),
  priority: z.nativeEnum(TaskPriority, {
    required_error: "La prioridad es requerida",
  }),
  dueDate: z.date().optional().nullable(),
});

export type TaskCreate = z.infer<typeof createTaskSchema>;
