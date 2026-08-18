// Toaster.tsx

import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { useToastStore } from "./store";

export function Toaster() {
  const { toasts, remove } = useToastStore();

  return (
    <div
      className="pointer-events-none fixed right-4 bottom-4 z-9999 flex w-full max-w-sm flex-col gap-3"
      aria-live="polite">
      {toasts.map(toast => {
        const Icon =
          toast.type === "success"
            ? CheckCircle2
            : toast.type === "error"
              ? AlertCircle
              : toast.type === "warning"
                ? TriangleAlert
                : Info;

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 rounded-lg border bg-background p-4 shadow-lg">
            <Icon className="size-5 shrink-0" />

            <span className="flex-1 text-sm">{toast.message}</span>

            <button
              type="button"
              onClick={() => remove(toast.id)}
              aria-label="Close notification">
              <X className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
