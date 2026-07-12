import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../helpers";

type FormSectionProps = ComponentPropsWithoutRef<"section"> & {
  sectionLabel?: string;
};

export function FormSection({
  className,
  children,
  sectionLabel,
  ...props
}: FormSectionProps) {
  return (
    <section
      aria-label={sectionLabel}
      className={cn("space-y-6", className)}
      {...props}>
      {children}
    </section>
  );
}
