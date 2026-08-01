import { FormikProvider, type FormikProps, type FormikValues } from "formik";

export type FormFormikProps<T extends FormikValues> = Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    "onSubmit"
> & {
    methods: FormikProps<T>;
    children: React.ReactNode;
};