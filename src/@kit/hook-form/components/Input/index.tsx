import { FieldValues } from "react-hook-form";
import { InputProps } from "./types";

export function Input<T extends FieldValues>({
  name,
  register,
  ...props
}: InputProps<T>) {
  return <input {...register(name)} {...props} />;
}
