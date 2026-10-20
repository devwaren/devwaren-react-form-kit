import type { FormikConfig } from "formik";
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

type CreateFormikFormSettingsProps<
    TSchema extends z.ZodTypeAny,
> = {
    schema: TSchema;
    defaultValues: z.input<TSchema>;
    onSubmit: (
        values: z.output<TSchema>,
        helpers: import("formik").FormikHelpers<z.output<TSchema>>,
    ) => void | Promise<void>;
    clearFields?: readonly DeepKeys<z.input<TSchema>>[];
    ignoreFields?: readonly (keyof z.output<TSchema>)[];
    validateOnBlur?: FormikConfig<z.input<TSchema>>["validateOnBlur"];
    validateOnChange?: FormikConfig<z.input<TSchema>>["validateOnChange"];
    validateOnMount?: FormikConfig<z.input<TSchema>>["validateOnMount"];
};

export function createFormikFormSettings<
    TSchema extends z.ZodTypeAny,
>({
    schema,
    defaultValues,
    onSubmit,
    clearFields = [],
    ignoreFields = [],
    validateOnBlur,
    validateOnChange,
    validateOnMount,
}: CreateFormikFormSettingsProps<TSchema>) {

   

    return {
        schema,
        initialValues: defaultValues,
        onSubmit,
        clearFields,
        ignoreFields,
        validateOnBlur,
        validateOnChange,
        validateOnMount,
    };
}