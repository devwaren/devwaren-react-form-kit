import { create } from "zustand";
import type { ToastOptionFunction, ToastStore } from "./types";

const timers = new Map<string, ReturnType<typeof setTimeout>>();

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
					className: options.className,
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