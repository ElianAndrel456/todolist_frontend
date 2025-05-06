import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Label as PieLabel } from "recharts";
import { Task } from "@/store/task.store";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ChartPie } from "lucide-react";
import { Typografy } from "../../../components/ui/Typografy";

export function Header({ tasks }: { tasks: Task[] | null }) {
  const chartConfig = {} satisfies ChartConfig;

  const chartData = [
    {
      name: "Tareas completadas",
      value: tasks?.filter((task) => task.completed).length,
      fill: "var(--chart-2)",
    },
    {
      name: "Tareas pendientes",
      value: tasks?.filter((task) => !task.completed).length,
      fill: "var(--chart-5)",
    },
  ];
  return (
    <header className="flex justify-between">
      <div className="flex items-center">
        <img
          src="https://res.cloudinary.com/dnvbdfkmn/image/upload/v1745703892/pptnkbfcyl6iaguaiiie.png"
          alt="logo task list app"
          width={80}
          height={80}
        />
        <Typografy variant="small">TaskListXpert</Typografy>
      </div>
      <div className="flex items-center space-x-4">
        {tasks && (
          <>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" disabled={!tasks?.length}>
                  <ChartPie />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Estadisticas de tareas</SheetTitle>
                  <SheetDescription>
                    En esta sección podrás ver las estadísticas de tus tareas.
                  </SheetDescription>
                </SheetHeader>
                <div>
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        strokeWidth={5}
                      >
                        <PieLabel
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                  >
                                    {tasks?.length.toString()}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    Total de tareas
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                </div>
              </SheetContent>
            </Sheet>
            <ModeToggle />
          </>
        )}
      </div>
    </header>
  );
}
