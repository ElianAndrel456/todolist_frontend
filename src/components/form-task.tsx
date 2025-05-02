import { TaskPriority } from "@/store/task.store";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Send } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createTaskSchema } from "@/schema/create-task-schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
interface Props {
  formCreate: UseFormReturn<z.infer<typeof createTaskSchema>>;
  onSubmitCreate(values: z.infer<typeof createTaskSchema>): void;
}
export function FormTask({ formCreate, onSubmitCreate }: Props) {
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
                    <Textarea
                      {...field}
                      placeholder="Escribe la descripción de tu tarea"
                    />
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
          Crear Tarea <Send />
        </Button>
      </form>
    </Form>
  );
}
