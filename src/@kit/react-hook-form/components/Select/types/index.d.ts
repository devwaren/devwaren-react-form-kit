import type { SelectHTMLAttributes } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

export type SelectProps<T extends FieldValues> =
    SelectHTMLAttributes<HTMLSelectElement> & {
        name: Path<T>;
    };