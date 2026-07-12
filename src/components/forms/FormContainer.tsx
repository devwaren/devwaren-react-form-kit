import type { ReactNode } from "react";

type FormContainerProps = {
	children: ReactNode;
};

export function FormContainer({ children }: FormContainerProps) {
	return (
		<div className="flex w-full flex-col items-center gap-4">{children}</div>
	);
}
