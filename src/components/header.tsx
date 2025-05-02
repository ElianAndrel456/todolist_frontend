import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { LogoutButton } from "@/components/logout-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Profile } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { ChartPie } from "lucide-react";
import { Typografy } from "./ui/Typografy";
import { useAuth0 } from "@auth0/auth0-react";

export function Header({ tasks }: { tasks: Task[] }) {
  const { user } = useAuth0();
  const chartConfig = {
    /*  visitors: {
        label: "Visiors",
      },t
      chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-4))",
      },
      safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
      },
      firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
      },
      edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
      },
      other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
      }, */
  } satisfies ChartConfig;

  const chartData = [
    {
      name: "Tareas completadas",
      value: tasks.filter((task) => task.completed).length,
      fill: "var(--chart-2)",
    },
    {
      name: "Tareas pendientes",
      value: tasks.filter((task) => !task.completed).length,
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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
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
                                {tasks.length.toString()}
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
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Profile />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Typografy variant="p">
                Bienvenido {user?.name?.split(" ")[0]}
              </Typografy>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropdownMenuLabel>
                <LogoutButton />
              </DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
