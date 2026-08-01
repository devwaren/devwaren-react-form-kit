import type { InputHTMLAttributes } from "react";
import type { FormikProps, FormikValues } from "formik";

export type InputProps<T extends FormikValues> =
    InputHTMLAttributes<HTMLInputElement> & {
        name: keyof T & string;
        formik: FormikProps<T>;
    };