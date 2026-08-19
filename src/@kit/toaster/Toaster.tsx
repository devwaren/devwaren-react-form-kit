import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { ToasterPosition } from "./constants/types";
import { useToastStore } from "./store";
import { Mapper } from "../layouts";
import { positionClasses } from "./constants";

type Props = {
  position?: ToasterPosition;
};

export function Toaster({ position = "bottom-right" }: Props) {
  const { toasts, remove } = useToastStore();

  return (
    <Mapper
      listFor="toaster"
      items={toasts}
      className={`pointer-events-none fixed z-9999 flex w-full max-w-sm flex-col gap-3 ${positionClasses[position]}`}>
      {toast => (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={toast.id}
            layout
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className={`
              pointer-events-auto
              flex
              items-center
              gap-3
              rounded-xl
              border
              bg-white
              p-4
              shadow-lg
              ${toast.className ?? ""}
            `}>
            <span className="flex-1 text-sm font-medium">{toast.message}</span>

            <button
              type="button"
              onClick={() => remove(toast.id)}
              className="rounded-md p-1 transition hover:bg-black/5">
              <X className="size-4" />
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </Mapper>
  );
}
