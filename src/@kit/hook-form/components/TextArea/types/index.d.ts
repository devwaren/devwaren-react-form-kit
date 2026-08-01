import type { FieldValues, Path } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { TextareaHTMLAttributes } from "react";

export type TextAreaProps<T extends FieldValues> =
    TextareaHTMLAttributes<HTMLTextAreaElement> & {
        name: Path<T>;
    };