 type ToastType = "success" | "error" | "info" | "warning";

 type ToastOptions = {
	className?: string;
	duration?: number;
};

 type ToastData = {
	id: string;
	message: string;
	type: ToastType;
	className?: string;
	duration: number;
};

export type ToastStore = {
	toasts: ToastData[];
	add: (
		message: string,
		type: ToastType,
		options?: ToastOptions,
	) => void;
	remove: (id: string) => void;
};

export type ToastOptionFunction = {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
}