import { create } from "zustand";

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: Date | null;
  priority: TaskPriority;
  description: string;
}

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  toggleTask: (taskId: number) => void;
  removeTask: (taskId: number) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  clearTasks: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  toggleTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    })),

  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),
  clearTasks: () => set({ tasks: [] }),
}));
