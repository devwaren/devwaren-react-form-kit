import {
	useField,
	useFormikContext,
	type FormikValues,
} from "formik";
import { useEffect, useRef, useState } from "react";

type DeepKeys<T> = T extends readonly (infer U)[]
	? `${number} ` | `${number}.${DeepKeys<U>}`
	: T extends object
	? {
		[K in keyof T & string]:
		| K
		| (T[K] extends object
			? `${K}.${DeepKeys<T[K]>}`
			: never);
	}[keyof T & string]
	: never;

export const useInput = <T extends FormikValues>(
	name: DeepKeys<T>,
) => {
	const context = useFormikContext<T>();

	if (!context) {
		throw new Error(
			"useInput must be used inside a Form component consider import { Form } @dev-waren/react-form-kit/formik.",
		);
	}

	const [field, meta] = useField(String(name));
	const { submitCount } = context;

	const [showError, setShowError] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const previousSubmitCount = useRef(submitCount);

	const hasError = Boolean(meta.error);
	const hasSubmitted = submitCount > 0;

	useEffect(() => {
		const clearTimer = () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};

		const isNewSubmit =
			submitCount > previousSubmitCount.current;

		previousSubmitCount.current = submitCount;

		if (hasSubmitted && hasError && isNewSubmit) {
			clearTimer();
			setShowError(true);

			timeoutRef.current = setTimeout(() => {
				setShowError(false);
				timeoutRef.current = null;
			}, 5000);
		}

		if (!hasError) {
			clearTimer();
			setShowError(false);
		}

		return clearTimer;
	}, [submitCount, hasError, hasSubmitted]);

	return {
		register: field,
		isError: hasSubmitted && hasError && showError,
		error:
			hasSubmitted && hasError && showError
				? meta.error
				: undefined,
	};
};