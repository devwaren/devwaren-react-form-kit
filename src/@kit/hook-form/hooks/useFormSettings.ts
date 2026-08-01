import { sanitize } from "#/@kit/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type DefaultValues,
	type SubmitHandler,
	UseFormProps,
	type UseFormReturn,
	useForm,
} from "react-hook-form";
import type { z } from "zod/v3";

type UseFormSettingsProps<TSchema extends z.ZodTypeAny> = {
	schema: TSchema;
	defaultValues?: DefaultValues<z.input<TSchema>>;
	onSubmit: SubmitHandler<z.output<TSchema>>;
	ignoreFields?: readonly (keyof z.output<TSchema>)[];
	clearFields?: readonly (keyof z.input<TSchema>)[];
	mode?: UseFormProps<z.input<TSchema>>["mode"];
	reValidateMode?: UseFormProps<z.input<TSchema>>["reValidateMode"];
};
type UseFormSettingsReturn<TSchema extends z.ZodTypeAny> = {
	methods: UseFormReturn<z.input<TSchema>, unknown, z.output<TSchema>>;
	schema: TSchema;
	onSubmit: React.ChangeEventHandler<HTMLFormElement>;
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
	const methods = useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
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
			const values = methods.getValues();

			for (const field of clearFields) {
				values[field] = "" as z.input<TSchema>[typeof field];
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