import {
	useField,
	useFormikContext,
} from "formik";
import type { FormikValues } from "formik";
import { useEffect, useRef, useState } from "react";
import { Path } from "react-hook-form";

export const useInput = <T extends FormikValues>(name: Path<T>) => {
	const [field, meta] = useField(name);
	const { submitCount } = useFormikContext<T>();

	const [showError, setShowError] = useState(false);
	const timeoutRef = useRef<number | null>(null);
	const previousSubmitCount = useRef(submitCount);

	const hasError = Boolean(meta.error);
	const hasSubmitted = submitCount > 0;

	const clearTimer = () => {
		if (timeoutRef.current !== null) {
			window.clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const displayError = () => {
		clearTimer();

		setShowError(true);

		timeoutRef.current = window.setTimeout(() => {
			setShowError(false);
			timeoutRef.current = null;
		}, 5000);
	};

	useEffect(() => {
		const isNewSubmit =
			submitCount > previousSubmitCount.current;

		previousSubmitCount.current = submitCount;

		if (hasSubmitted && hasError && isNewSubmit) {
			displayError();
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
}