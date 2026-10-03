import { create } from "zustand";
import type { ToastOptionFunction, ToastStore } from "./types";

const timers = new Map<string, ReturnType<typeof setTimeout>>();

const toastStyles = {
	success:
		"border-emerald-500/20 bg-emerald-500/10 text-emerald-100",
	error:
		"border-red-500/20 bg-red-500/10 text-red-100",
	info:
		"border-blue-500/20 bg-blue-500/10 text-blue-100",
	warning:
		"border-amber-500/20 bg-amber-500/10 text-amber-100",
} as const;

export const useToastStore = create<ToastStore>((set) => ({
	toasts: [],

	add: (message, type, options = {}) => {
		const id = crypto.randomUUID();
		const duration = options.duration ?? 3000;

		set((state) => ({
			toasts: [
				...state.toasts,
				{
					id,
					message,
					type,
					className: `${toastStyles[type]} ${options.className ?? ""}`.trim(),
					duration,
				},
			],
		}));

		if (duration > 0) {
			const timer = setTimeout(() => {
				timers.delete(id);

				set((state) => ({
					toasts: state.toasts.filter(
						(toast) => toast.id !== id,
					),
				}));
			}, duration);

			timers.set(id, timer);
		}
	},

	remove: (id) => {
		const timer = timers.get(id);

		if (timer) {
			clearTimeout(timer);
			timers.delete(id);
		}

		set((state) => ({
			toasts: state.toasts.filter(
				(toast) => toast.id !== id,
			),
		}));
	},
}));

export const toast: ToastOptionFunction = {
	success: (message, options) =>
		useToastStore.getState().add(
			message,
			"success",
			options,
		),

	error: (message, options) =>
		useToastStore.getState().add(
			message,
			"error",
			options,
		),

	info: (message, options) =>
		useToastStore.getState().add(
			message,
			"info",
			options,
		),

	warning: (message, options) =>
		useToastStore.getState().add(
			message,
			"warning",
			options,
		),
};