import type { ReactNode } from "react";

type FormFooterProps = {
  children: ReactNode;
  className?: string;
};

export function FormFooter({ children, className }: FormFooterProps) {
  return (
    <footer
      className={[
        "flex items-center justify-end gap-2 border-t pt-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}>
      {children}
    </footer>
  );
}
