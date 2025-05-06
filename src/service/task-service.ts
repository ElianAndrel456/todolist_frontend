import { http } from "@/lib/http";
import { TaskCreate } from "@/schema/create-task-schema";

const TASK_API_URL = "api/v1/tasks";

export class TaskService {
  static async getAllTask() {
    const response = await http.get(`${TASK_API_URL}`);
    return response.data;
  }

  static async createTask(task: TaskCreate) {
    console.log("task", task);
    await http.post(TASK_API_URL, task);
  }

  static async updateTask({
    taskId,
    task,
  }: {
    taskId: number;
    task: TaskCreate;
  }) {
    await http.put(TASK_API_URL + `/${taskId}`, task);
  }

  static async deleteTask(taskId: number) {
    await http.delete(TASK_API_URL + `/${taskId}`);
  }
}
