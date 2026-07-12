import type { ComponentPropsWithoutRef } from "react";
import { cn } from "#/helpers";

type FormTitleProps = ComponentPropsWithoutRef<"h1">;

export function FormTitle({ className, children, ...props }: FormTitleProps) {
  return (
    <h1 className={cn("text-xs text-white md:text-base", className)} {...props}>
      {children}
    </h1>
  );
}
