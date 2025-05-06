import { Task } from "@/store/task.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Clock, Edit, MoreVertical, OctagonAlert, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskCreate } from "@/schema/create-task-schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { FormTask } from "./form-task";

interface Props {
  task: Task;
  removeTask: (taskId: number) => void;
  updateTask: ({ taskId, task }: { taskId: number; task: TaskCreate }) => void;
}

export function Cardtask({ task, removeTask, updateTask }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className="w-full relative group overflow-hidden py-2">
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
                <Label
                  className={cn(
                    task.completed ? "line-through text-gray-400" : ""
                  )}
                  htmlFor={`tarea${task.id}`}
                >
                  {task.title}
                </Label>
              </div>
              <div className="flex gap-2 items-center">
                {task.dueDate ? (
                  <p className="text-xs text-gray-400 ">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {new Date(task.dueDate).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </div>
                  </p>
                ) : null}
                {task.priority ? (
                  <p
                    className={cn(
                      "text-xs font-semibold flex gap-1",
                      task.priority === "high"
                        ? "text-red-100"
                        : task.priority === "medium"
                        ? "text-yellow-100"
                        : "text-green-100"
                    )}
                  >
                    <OctagonAlert size={16} />
                    {task.priority === "high"
                      ? "Alta"
                      : task.priority === "medium"
                      ? "Media"
                      : "Baja"}
                  </p>
                ) : null}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem onSelect={() => setOpen(true)}>
                      <Edit />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        removeTask(task.id);
                      }}
                    >
                      <Trash />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        {task.description ? (
          <CardContent>
            <div className="flex justify-between  gap-2">
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          </CardContent>
        ) : null}
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <FormTask task={task} />
        </DialogContent>
      </Dialog>
    </>
  );
}
