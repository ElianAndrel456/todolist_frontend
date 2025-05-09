import { TaskService } from "@/service/task-service";
import { useTaskStore } from "@/store/task.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

export const useTask = () => {
  const queryClient = useQueryClient();
  const { tasks, setTasks } = useTaskStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => TaskService.getAllTask(),
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  async function onSettled() {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  }

  function onSuccess(msj: string) {
    toast.success(msj);
  }
  function onError(e: Error, msj: string) {
    if (e instanceof AxiosError) {
      msj = e.response?.data.error || msj;
    }
    toast.error(msj);
  }

  const { mutate: mutateAddTask } = useMutation({
    mutationFn: TaskService.createTask,

    onSuccess: () => onSuccess("Tarea creada correctamente"),
    onError: (e) => onError(e, "Error al crear la tarea"),
    onSettled: onSettled,
  });

  const { mutate: mutateRemoveTask } = useMutation({
    mutationFn: TaskService.deleteTask,
    onSuccess: () => onSuccess("Tarea eliminada correctamente"),
    onError: (e) => onError(e, "Error al eliminar la tarea"),
    onSettled: onSettled,
  });

  const { mutate: mutateUpdateTask } = useMutation({
    mutationFn: TaskService.updateTask,
    onSuccess: () => onSuccess("Tarea actualizada correctamente"),
    onError: (e) => onError(e, "Error al actualizar la tarea"),
    onSettled: onSettled,
  });

  return {
    tasks,
    isLoading,
    isError,
    addTask: mutateAddTask,
    removeTask: mutateRemoveTask,
    updateTask: mutateUpdateTask,
  };
};
