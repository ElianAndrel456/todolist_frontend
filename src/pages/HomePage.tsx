import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { createTaskSchema } from "@/schema/create-task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typografy } from "@/components/ui/Typografy";
import { useTask } from "@/hooks/useTask";
import { TaskPriority } from "@/store/task.store";
import { Header } from "@/components/header";
import { Cardtask } from "@/components/card-task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FormTask } from "@/components/form-task";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { tasks, addTask, removeTask, updateTask } = useTask(user?.sub || "");

  const formCreate = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      completed: false,
      description: "",
      priority: TaskPriority.LOW,
      dueDate: null,
    },
  });

  function onSubmitCreate(values: z.infer<typeof createTaskSchema>) {
    addTask({
      title: values.title,
      completed: values.completed,
      userId: user?.sub || "",
      dueDate: values.dueDate,
      priority: values.priority,
      description: values.description,
      parentId: null,
    });
    formCreate.reset();
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  const [selectValue, setSelectValue] = useState("all");

  const renderTasks = useMemo(() => {
    if (selectValue === "completed") {
      return tasks.filter((task) => task.completed);
    }
    if (selectValue === "incompleted") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  }, [selectValue, tasks]);

  return (
    <main className="px-8">
      <Header tasks={tasks} />
      <section className="grid grid-cols-8 max-w-7xl mx-auto gap-8 ">
        <section className="mt-8 space-y-8 col-span-3">
          <Typografy variant="h1">Gestor de tareas</Typografy>
          <Typografy variant="small">Proyecto: Nombre del Proyecto</Typografy>
          <Separator className="my-4" />
          <FormTask formCreate={formCreate} onSubmitCreate={onSubmitCreate} />
        </section>

        <section className="mt-8 space-y-8 col-span-5">
          <div>
            <Typografy>Filtro</Typografy>
            <Select
              onValueChange={(value) => {
                setSelectValue(value);
              }}
              value={selectValue}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="completed">completadas</SelectItem>
                <SelectItem value="incompleted">pendientes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Typografy variant="h2">Tus Tareas</Typografy>
          <ScrollArea className="rounded-md h-[80vh]">
            <ul className="space-y-4">
              {isLoading &&
                Array.from({ length: 6 }).map((_, index) => (
                  <li key={index}>
                    <Skeleton className="h-20 w-full" />
                  </li>
                ))}

              {renderTasks?.map((task) => (
                <li key={task.id}>
                  <Cardtask
                    task={task}
                    removeTask={removeTask}
                    updateTask={updateTask}
                  />
                </li>
              ))}
            </ul>
          </ScrollArea>
        </section>
      </section>
    </main>
  );
}
