import type { FormHTMLAttributes } from "react";
import type { AnyFormApi, type useForm } from "@tanstack/react-form";
import { FormProvider } from "./context";

type FormMethods = ReturnType<typeof useForm>;

export type FormProps = Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
    methods: FormMethods;
    children: React.ReactNode;
};