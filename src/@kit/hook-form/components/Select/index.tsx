import { FieldValues, useFormContext } from "react-hook-form";
import { SelectProps } from "./types";

export function Select<T extends FieldValues>({
  name,
  children,
  ...props
}: SelectProps<T>) {
  const { register } = useFormContext<T>();

  return (
    <select {...register(name)} {...props}>
      {children}
    </select>
  );
}
