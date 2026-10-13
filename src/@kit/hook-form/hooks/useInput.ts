import { useEffect, useState } from "react";
import {
	type FieldValues,
	get,
	type Path,
	useFormContext,
} from "react-hook-form";

const useInput = <T extends FieldValues>(name: Path<T>) => {
	const context = useFormContext<T>();

	if (!context) {
		throw new Error(
			"useInput must be used inside the Form component consider import { Form } from @dev-waren/react-form-kit/hook-form.",
		);
	}

	const {
		register: formRegister,
		formState: { errors, submitCount },
	} = context;

	const error = get(errors, name)?.message;
	const [isError, setShowError] = useState(false);

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
		isError,
	};
};

export { useInput };