import type { DeepKeys } from "@tanstack/react-form";
import type { z } from "zod/v3";

type CreateTanstackFormSettingsProps<
    TSchema extends z.ZodTypeAny,
> = {
    schema: TSchema;
    defaultValues: z.input<TSchema>;
    onSubmit: (data: z.output<TSchema>) => void | Promise<void>;
    clearFields?: readonly DeepKeys<z.input<TSchema>>[];
    ignoreFields?: readonly (keyof z.output<TSchema>)[];
};

export function createTanstackFormSettings<
    TSchema extends z.ZodTypeAny,
>({
    schema,
    defaultValues,
    onSubmit,
    clearFields = [],
    ignoreFields = [],
}: CreateTanstackFormSettingsProps<TSchema>) {

    if (typeof window === "undefined") {
        throw new Error(
            "createTanstackFormSettings is client-only and cannot be used during SSR.",
        );
    }

    return {
        schema,
        defaultValues,
        onSubmit,
        clearFields,
        ignoreFields,
    } satisfies CreateTanstackFormSettingsProps<TSchema>;
}