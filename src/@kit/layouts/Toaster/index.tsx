import { X } from "lucide-react";
import { useToastStore } from "./store";
import { Mapper } from "../Mapper";

export function Toaster() {
  const { toasts, remove } = useToastStore();

  return (
    <Mapper
      listFor="toaster"
      items={toasts}
      className="pointer-events-none fixed right-4 bottom-4 z-9999 flex w-full max-w-sm flex-col gap-3">
      {toast => (
        <div
          key={toast.id}
          className="
						pointer-events-auto
						flex
						items-center
						gap-3
						rounded-xl
						border
						bg-white
						p-4
						shadow-lg
					">
          <span className="flex-1 text-sm font-medium">{toast.message}</span>

          <button
            type="button"
            onClick={() => remove(toast.id)}
            className="rounded-md p-1 transition hover:bg-black/5">
            <X className="size-4" />
          </button>
        </div>
      )}
    </Mapper>
  );
}
