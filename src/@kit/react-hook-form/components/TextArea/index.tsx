import { FieldValues, useFormContext } from "react-hook-form";
import { TextAreaProps } from "./types";

export function TextArea<T extends FieldValues>({
  name,
  ...props
}: TextAreaProps<T>) {
  const { register } = useFormContext<T>();

  return <textarea {...register(name)} {...props} />;
}
