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
				fixed
				z-[9999]
				flex
				w-[calc(100%-2rem)]
				max-w-sm
				flex-col
				gap-3
				${positionClasses[position]}
			`}>
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
							border-black/10
							bg-white/95
							p-4
							text-gray-900
							shadow-xl
							backdrop-blur-md
							dark:border-white/10
							dark:bg-gray-900/90
							dark:text-white
							${toast.className ?? ""}
						`}>
						<span className="flex-1 text-sm font-medium leading-5">
							{toast.message}
						</span>

						<button
							type="button"
							onClick={() => remove(toast.id)}
							className={`
								shrink-0
								rounded-lg
								p-1.5
								text-gray-500
								transition
								hover:bg-black/5
								hover:text-gray-900
								focus:outline-none
								focus:ring-2
								focus:ring-black/10
								dark:text-white/60
								dark:hover:bg-white/10
								dark:hover:text-white
								dark:focus:ring-white/20
							`}
							aria-label="Close notification">
							<X className="size-4" />
						</button>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
