import { useEffect, useState } from "react";
import {
	type FieldValues,
	get,
	type Path,
	useFormContext,
} from "react-hook-form";

const useInput = <T extends FieldValues>(name: Path<T>) => {
	const {
		register: formRegister,
		formState: { errors, submitCount },
	} = useFormContext<T>();

	const error = get(errors, name)?.message;
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (!error || submitCount === 0) {
			setShowError(false);
			return;
		}

		setShowError(true);

		const timeout = setTimeout(() => {
			setShowError(false);
		}, 5000);

		return () => clearTimeout(timeout);
	}, [error, submitCount]);

	return {
		register: formRegister(name),
		error,
		showError,
	};
};

export { useInput };