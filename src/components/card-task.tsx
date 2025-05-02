import { Task, TaskCreate } from "@/store/task.store";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Edit, Trash } from "lucide-react";

interface Props {
  task: Task;
  removeTask: (taskId: number) => void;
  updateTask: ({ taskId, task }: { taskId: number; task: TaskCreate }) => void;
}

export function Cardtask({ task, removeTask, updateTask }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <div className="flex items-center">
              <Checkbox
                checked={task.completed}
                id={`tarea${task.id}`}
                className="mr-2"
                onCheckedChange={(e) => {
                  const { id, ...atrTask } = task;

                  updateTask({
                    taskId: id,
                    task: {
                      ...atrTask,
                      completed: Boolean(e),
                    },
                  });
                }}
              />
              <Label htmlFor={`tarea${task.id}`}>{task.title}</Label>
            </div>
            <div className="flex gap-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Button type="submit" variant={"outline"} size={"icon"}>
                  <Edit />
                </Button>
              </form>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  removeTask(task.id);
                }}
              >
                <Button variant={"ghost"} size={"icon"} type="submit">
                  <Trash />
                </Button>
              </form>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
