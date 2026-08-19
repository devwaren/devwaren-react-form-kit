
import { create } from "zustand";
import { ToastOptionFunction, ToastStore } from "./types";

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
			setTimeout(() => {
				set((state) => ({
					toasts: state.toasts.filter(
						(toast) => toast.id !== id,
					),
				}));
			}, duration);
		}
	},

	remove: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		})),
}));

export const toast: ToastOptionFunction = {
	success: (message, options) =>
		useToastStore
			.getState()
			.add(message, "success", options),

	error: (message, options) =>
		useToastStore
			.getState()
			.add(message, "error", options),

	info: (message, options) =>
		useToastStore
			.getState()
			.add(message, "info", options),

	warning: (message, options) =>
		useToastStore
			.getState()
			.add(message, "warning", options),
};