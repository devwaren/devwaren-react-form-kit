import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { ToasterPosition } from "./constants/types";
import { useToastStore } from "./store";
import { positionClasses } from "./constants";

type Props = {
	position?: ToasterPosition;
};

export function Toaster({ position = "bottom-right" }: Props) {
	const { toasts, remove } = useToastStore();

	return (
		<div
			className={`
				pointer-events-none
				absolute
				z-[9999]
				flex
				w-1/2
				max-w-sm
				flex-col
				gap-3
				${positionClasses[position]}
			`}
		>
			<AnimatePresence mode="popLayout">
				{toasts.map((toast) => (
					<motion.div
						key={toast.id}
						layout
						initial={{
							opacity: 0,
							y: 20,
							scale: 0.96,
						}}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
						}}
						exit={{
							opacity: 0,
							y: 20,
							scale: 0.96,
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
							border-white/10
							bg-zinc-900/90
							p-4
							text-white
							shadow-xl
							backdrop-blur-md
							${toast.className ?? ""}
						`}
					>
						<span className="flex-1 text-sm font-medium leading-5">
							{toast.message}
						</span>

						<button
							type="button"
							onClick={() => remove(toast.id)}
							className="
								shrink-0
								rounded-lg
								p-1.5
								text-white/60
								transition
								hover:bg-white/10
								hover:text-white
								focus:outline-none
								focus:ring-2
								focus:ring-white/20
							"
							aria-label="Close notification"
						>
							<X className="size-4" />
						</button>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}