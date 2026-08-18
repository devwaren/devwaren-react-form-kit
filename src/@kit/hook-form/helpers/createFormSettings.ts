import { zodResolver } from "@hookform/resolvers/zod";
import type { DefaultValues, UseFormProps } from "react-hook-form";
import type { z } from "zod/v3";

type CreateFormSettingsProps<TSchema extends z.ZodTypeAny> = {
    schema: TSchema;
    defaultValues?: DefaultValues<z.input<TSchema>>;
    onSubmit: (data: z.output<TSchema>) => void | Promise<void>;
};

export function createFormSettings<TSchema extends z.ZodTypeAny>({
    schema,
    defaultValues,
    onSubmit,
}: CreateFormSettingsProps<TSchema>) {
    return {
        resolver: zodResolver(schema),
        defaultValues,
        onSubmit,
    } satisfies UseFormProps<z.input<TSchema>> & {
        onSubmit: (data: z.output<TSchema>) => void | Promise<void>;
    };
}
