import { useField } from "formik";
import type { SelectProps } from "./types";

export function Select({ name, children, ...props }: SelectProps) {
  const [field] = useField(name);

  return (
    <select {...field} {...props}>
      {children}
    </select>
  );
}
