import { useForm } from "@tanstack/react-form";
import type { DeepKeys } from "@tanstack/react-form";
import type { z } from "zod/v3";
import { sanitize } from "#/@kit/helpers";

type UseTanstackFormSettingsProps<
    TSchema extends z.ZodTypeAny,
> = {
    schema: TSchema;
    defaultValues: z.input<TSchema>;
    onSubmit: (data: z.output<TSchema>) => void | Promise<void>;
    ignoreFields?: readonly (keyof z.output<TSchema>)[];
    clearFields?: readonly DeepKeys<z.input<TSchema>>[];
};

function getPathValue(
    object: unknown,
    path: string,
): unknown {
    return path.split(".").reduce<unknown>((value, key) => {
        if (value === null || typeof value !== "object") {
            return undefined;
        }

        return (value as Record<string, unknown>)[key];
    }, object);
}

export function useTanstackFormSettings<
    TSchema extends z.ZodTypeAny,
>({
    schema,
    defaultValues,
    onSubmit,
    ignoreFields = [],
    clearFields = [],
}: UseTanstackFormSettingsProps<TSchema>) {
    if (typeof window === "undefined") {
        throw new Error(
            "useTanstackFormSettings is client-only and cannot be used during SSR.",
        );
    }

    const form = useForm({
        defaultValues,
        validators: {
            onSubmit: ({ value }) => {
                const result = schema.safeParse(value);
                return result.success ? undefined : result.error;
            },
        },
        onSubmit: async ({ value, formApi }) => {
            const payload = schema.parse(sanitize({ ...value }));

            for (const field of ignoreFields) {
                delete payload[field];
            }

            await onSubmit(payload);

            for (const field of clearFields) {
                const path = String(field);
                const defaultValue = getPathValue(defaultValues, path);

                formApi.setFieldValue(
                    field as never,
                    (defaultValue !== undefined
                        ? structuredClone(defaultValue)
                        : "") as never,
                );
            }
        },
    });

    return {
        methods: form,
        schema,
    };
}