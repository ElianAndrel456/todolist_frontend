import { useMemo, useState } from "react";
import { Typografy } from "@/components/ui/Typografy";
import { useTask } from "@/hooks/useTask";
import { Header } from "@/pages/home/components/header";
import { Cardtask } from "@/pages/home/components/card-task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FormTask } from "@/pages/home/components/form-task";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextEffect } from "@/components/ui/text-effect";
import { cn } from "@/lib/utils";
export function HomePage() {
  const { tasks, removeTask, updateTask, isLoading } = useTask();

  const [selectValue, setSelectValue] = useState("all");

  const renderTasks = useMemo(() => {
    if (selectValue === "completed") {
      return tasks?.filter((task) => task.completed);
    }
    if (selectValue === "incompleted") {
      return tasks?.filter((task) => !task.completed);
    }
    return tasks;
  }, [selectValue, tasks]);

  return (
    <main className="px-8">
      <Header tasks={tasks} />
      <section className="grid md:grid-cols-8 max-w-7xl mx-auto gap-8 grid-cols-4">
        <section className="mt-8 space-y-8 col-span-3">
          <Typografy variant="h1">
            <TextEffect per="char" preset="fade-in-blur">
              Gestor de tareas
            </TextEffect>
          </Typografy>

          <Typografy variant="small">
            <TextEffect per="char" preset="fade">
              Organiza tus tareas de manera sencilla y eficiente.
            </TextEffect>
          </Typografy>
          <Separator className="my-4" />
          <div className="animate-in fade-in slide-in-from-top-8 duration-500">
            <FormTask />
          </div>
        </section>

        <section className="mt-8 space-y-8 col-span-5">
          <div className="flex gap-4">
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
          <ScrollArea className="rounded-md h-[60vh]">
            <ul className="space-y-4">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <li key={index}>
                      <Skeleton className="h-20 w-full" />
                    </li>
                  ))
                : renderTasks?.map((task) => (
                    <li
                      key={task.id}
                      className={cn(
                        "animate-in fade-in-0 duration-100",
                        task.completed ? "opacity-50" : "opacity-100"
                      )}
                    >
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
