import { toFormikValidationSchema } from "zod-formik-adapter";
import {
	type FormikConfig,
	type FormikHelpers,
	type FormikProps,
	useFormik,
} from "formik";
import type { z, ZodTypeAny } from "zod/v3";
import { ZodType } from "zod";
import { sanitize } from "#/@kit/helpers";

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

type UseFormikFormSettingsProps<TSchema extends z.ZodTypeAny> = {
	schema: TSchema;
	defaultValues: z.input<TSchema>;
	onSubmit: (
		values: z.output<TSchema>,
		helpers: FormikHelpers<z.output<TSchema>>,
	) => Promise<void> | void;
	ignoreFields?: readonly (keyof z.output<TSchema>)[];
	clearFields?: readonly DeepKeys<z.input<TSchema>>[];
	validateOnBlur?: FormikConfig<z.input<TSchema>>["validateOnBlur"];
	validateOnChange?: FormikConfig<z.input<TSchema>>["validateOnChange"];
	validateOnMount?: FormikConfig<z.input<TSchema>>["validateOnMount"];
};

type UseFormikFormSettingsReturn<TSchema extends z.ZodTypeAny> = {
	methods: FormikProps<z.input<TSchema>>;
	schema: TSchema;
};

export function useFormikFormSettings<TSchema extends z.ZodTypeAny>({
	schema,
	defaultValues,
	onSubmit,
	ignoreFields = [],
	clearFields = [],
	validateOnBlur,
	validateOnChange,
	validateOnMount,
}: UseFormikFormSettingsProps<TSchema>): UseFormikFormSettingsReturn<TSchema> {



	const methods = useFormik<z.input<TSchema>>({
		initialValues: defaultValues,
		validationSchema: toFormikValidationSchema(
			schema as unknown as ZodType,
		),
		validateOnBlur,
		validateOnChange,
		validateOnMount,
		onSubmit: async (values, helpers) => {
			const payload = sanitize({ ...values });

			for (const field of ignoreFields) {
				delete payload[field];
			}

			await onSubmit(payload as z.output<TSchema>, helpers);

			if (clearFields.length > 0) {
				const nextValues = structuredClone(values);

				for (const field of clearFields) {
					const path = String(field);
					const defaultValue = getPathValue(defaultValues, path);

					setPathValue(
						nextValues as Record<string, unknown>,
						path,
						defaultValue !== undefined
							? structuredClone(defaultValue)
							: "",
					);
				}

				helpers.resetForm({
					values: nextValues,
				});
			}
		},
	});

	return {
		methods,
		schema,
	};
}