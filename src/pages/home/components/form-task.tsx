import { Task, TaskPriority } from "@/store/task.store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTaskSchema } from "@/schema/create-task-schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTask } from "@/hooks/useTask";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
interface Props {
  task?: Task;
}

export function FormTask({ task }: Props) {
  const { addTask, updateTask } = useTask();

  const defaultValues = {
    title: task?.title || "",
    completed: task?.completed || false,
    description: task?.description || "",
    priority: task?.priority || TaskPriority.LOW,
    dueDate: task?.dueDate ? new Date(task.dueDate) : null,
  };

  const formCreate = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: defaultValues,
  });

  function onSubmitCreate(values: z.infer<typeof createTaskSchema>) {
    if (task) {
      const { id } = task;
      updateTask({
        taskId: id,
        task: {
          ...values,
        },
      });
      return;
    } else
      addTask({
        title: values.title,
        completed: values.completed,
        dueDate: values.dueDate,
        priority: values.priority,
        description: values.description,
      });

    formCreate.reset();
  }
  return (
    <Form {...formCreate}>
      <form
        onSubmit={formCreate.handleSubmit(onSubmitCreate)}
        className="flex justify-end flex-col space-y-4"
      >
        <FormField
          control={formCreate.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tarea</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  {...field}
                  placeholder="Escribe tu tarea*"
                  required
                />
              </FormControl>
              <FormDescription>
                Este campo es para crear el titulo de tu tarea.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Collapsible>
          <CollapsibleTrigger asChild className="w-full mb-2">
            <Button variant="secondary">ver mas opciones</Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4">
            <FormField
              control={formCreate.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Este campo es para crear la descripción de tu tarea.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formCreate.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioridad</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TaskPriority.LOW}>Baja</SelectItem>
                        <SelectItem value={TaskPriority.MEDIUM}>
                          Media
                        </SelectItem>
                        <SelectItem value={TaskPriority.HIGH}>Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Este campo es para seleccionar la prioridad de tu tarea.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {task ? null : (
              <FormField
                control={formCreate.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de vencimiento</FormLabel>
                    <Popover modal={false}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value as Date}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="w-auto"
                          locale={es}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Este campo es para seleccionar la fecha de vencimiento de
                      tu tarea.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CollapsibleContent>
        </Collapsible>

        <FormField
          control={formCreate.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>Completada</FormLabel>
              <FormControl>
                <Checkbox
                  id="completed"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="" type="submit">
          {task ? "Actualizar Tarea" : "Crear Tarea"}
          <Send />
        </Button>
      </form>
    </Form>
  );
}
