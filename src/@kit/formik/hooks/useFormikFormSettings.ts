import { toFormikValidationSchema } from "zod-formik-adapter";
import {
	type FormikConfig,
	type FormikHelpers,
	type FormikProps,
	useFormik,
} from "formik";
import type { z } from "zod/v3";
import { type ZodTypeAny } from "zod";
import { sanitize } from "#/@kit/helpers";

type UseFormikFormSettingsProps<TSchema extends z.ZodTypeAny> = {
	schema: TSchema;
	defaultValues: z.input<TSchema>;
	onSubmit: (
		values: z.output<TSchema>,
		helpers: FormikHelpers<z.output<TSchema>>,
	) => Promise<void> | void;
	ignoreFields?: readonly (keyof z.output<TSchema>)[];
	clearFields?: readonly (keyof z.input<TSchema>)[];
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
		validationSchema: toFormikValidationSchema(schema as unknown as ZodTypeAny),
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
				const nextValues = { ...methods.values };

				for (const field of clearFields) {
					nextValues[field] = "" as z.input<TSchema>[typeof field];
				}

				methods.resetForm({
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