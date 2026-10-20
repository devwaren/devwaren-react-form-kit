import { zodResolver } from "@hookform/resolvers/zod";
import type {
    DefaultValues,
    UseFormProps,
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

type CreateFormSettingsProps<
    TSchema extends z.ZodType,
> = {
    schema: TSchema;
    defaultValues?: DefaultValues<z.input<TSchema>>;
    onSubmit: (data: z.output<TSchema>) => void | Promise<void>;
    clearFields?: readonly DeepKeys<z.input<TSchema>>[];
};

export function createFormSettings<
    TSchema extends z.ZodType,
>({
    schema,
    defaultValues,
    onSubmit,
    clearFields = [],
}: CreateFormSettingsProps<TSchema>) {

    return {
        resolver: zodResolver(schema),
        defaultValues,
        onSubmit,
        clearFields,
    } satisfies UseFormProps<z.input<TSchema>> & {
        onSubmit: (data: z.output<TSchema>) => void | Promise<void>;
        clearFields: readonly DeepKeys<z.input<TSchema>>[];
    };
}