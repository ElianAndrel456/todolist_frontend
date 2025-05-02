import { cn } from "@/lib/utils";

interface TypografyProps {
  variant?: "h1" | "h2" | "h3" | "p" | "small";
  children?: React.ReactNode;
  className?: string;
}

export function Typografy({
  variant = "p",
  children,
  className,
}: TypografyProps) {
  switch (variant) {
    case "h1":
      return (
        <h1
          className={cn(
            "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
            className
          )}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={cn(
            "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
            className
          )}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={cn(
            "scroll-m-20 text-2xl font-semibold tracking-tight",
            className
          )}
        >
          {children}
        </h3>
      );
    case "p":
      return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
          {children}
        </p>
      );
    case "small":
      return (
        <small className={cn("text-sm font-medium leading-none", className)}>
          {children}
        </small>
      );

    default:
      return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
          {children}
        </p>
      );
  }
}
