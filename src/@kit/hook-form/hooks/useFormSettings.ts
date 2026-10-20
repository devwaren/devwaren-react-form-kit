import { sanitize } from "#/@kit/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type DefaultValues,
	type SubmitHandler,
	type UseFormProps,
	type UseFormReturn,
	useForm,
} from "react-hook-form";
import type { z } from "zod/v3";

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

function getPathValue(object: unknown, path: string): unknown {
	return path.split(".").reduce<unknown>((value, key) => {
		if (value === null || typeof value !== "object") {
			return undefined;
		}

		return (value as Record<string, unknown>)[key];
	}, object);
}

function setPathValue(
	object: Record<string, unknown>,
	path: string,
	value: unknown,
): void {
	const keys = path.split(".");
	const lastKey = keys.pop();

	if (!lastKey) return;

	let current = object;

	for (const key of keys) {
		const next = current[key];

		if (next === null || typeof next !== "object") {
			return;
		}

		current = next as Record<string, unknown>;
	}

	current[lastKey] = value;
}

type UseFormSettingsProps<TSchema extends z.ZodTypeAny> = {
	schema: TSchema;
	defaultValues?: DefaultValues<z.input<TSchema>>;
	onSubmit: SubmitHandler<z.output<TSchema>>;
	ignoreFields?: readonly (keyof z.output<TSchema>)[];
	clearFields?: readonly DeepKeys<z.input<TSchema>>[];
	mode?: UseFormProps<z.input<TSchema>>["mode"];
	reValidateMode?: UseFormProps<z.input<TSchema>>["reValidateMode"];
};

type UseFormSettingsReturn<TSchema extends z.ZodTypeAny> = {
	methods: UseFormReturn<
		z.input<TSchema>,
		unknown,
		z.output<TSchema>
	>;
	schema: TSchema;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export function useFormSettings<TSchema extends z.ZodTypeAny>({
	schema,
	defaultValues,
	onSubmit,
	ignoreFields = [],
	clearFields = [],
	mode,
	reValidateMode,
}: UseFormSettingsProps<TSchema>): UseFormSettingsReturn<TSchema> {

	const methods = useForm<
		z.input<TSchema>,
		unknown,
		z.output<TSchema>
	>({
		resolver: zodResolver(schema),
		defaultValues,
		mode,
		reValidateMode,
	});

	const handleSubmit = methods.handleSubmit(async (data) => {
		const payload = sanitize({ ...data });

		for (const field of ignoreFields) {
			delete payload[field];
		}

		await onSubmit(payload);

		if (clearFields.length > 0) {
			const values = structuredClone(methods.getValues());

			for (const field of clearFields) {
				const path = String(field);
				const defaultValue = getPathValue(defaultValues, path);

				setPathValue(
					values as Record<string, unknown>,
					path,
					defaultValue !== undefined
						? structuredClone(defaultValue)
						: "",
				);
			}

			methods.reset(values);
		}
	});

	return {
		methods,
		schema,
		onSubmit: handleSubmit,
	};
}