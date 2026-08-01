import {
    type FieldValues,
    FormProvider,
    type UseFormReturn,
} from "react-hook-form";

export type FormProps<T extends FieldValues> = Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    "onSubmit"
> & {
    methods: UseFormReturn<T>;
    onSubmit: React.ChangeEventHandler<HTMLFormElement>;
    children: React.ReactNode;
};