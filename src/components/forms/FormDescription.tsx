import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../helpers";

type FormDescriptionProps = ComponentPropsWithoutRef<"p">;

export function FormDescription({
  className,
  children,
  ...props
}: FormDescriptionProps) {
  return (
    <p
      className={cn(
        "max-w-md text-center text-xs text-gray-400 md:text-sm",
        className,
      )}
      {...props}>
      {children}
    </p>
  );
}
