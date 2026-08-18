// toast.ts

import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

export type ToastData = {
	id: string;
	message: string;
	type: ToastType;
	duration: number;
};

type ToastStore = {
	toasts: ToastData[];
	add: (message: string, type: ToastType, duration?: number) => void;
	remove: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
	toasts: [],

	add: (message, type, duration = 3000) => {
		const id = crypto.randomUUID();

		set((state) => ({
			toasts: [
				...state.toasts,
				{
					id,
					message,
					type,
					duration,
				},
			],
		}));

		setTimeout(() => {
			set((state) => ({
				toasts: state.toasts.filter((toast) => toast.id !== id),
			}));
		}, duration);
	},

	remove: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		})),
}));

export const toast = {
	success: (message: string, duration?: number) =>
		useToastStore.getState().add(message, "success", duration),

	error: (message: string, duration?: number) =>
		useToastStore.getState().add(message, "error", duration),

	info: (message: string, duration?: number) =>
		useToastStore.getState().add(message, "info", duration),

	warning: (message: string, duration?: number) =>
		useToastStore.getState().add(message, "warning", duration),
};