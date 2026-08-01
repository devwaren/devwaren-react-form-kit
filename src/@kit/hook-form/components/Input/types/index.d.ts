import type { InputHTMLAttributes } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

export type InputProps<T extends FieldValues> =
    InputHTMLAttributes<HTMLInputElement> & {
        name: Path<T>;
        register: UseFormRegister<T>;
    };