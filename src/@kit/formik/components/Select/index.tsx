import { useField } from "formik";
import { SelectProps } from "./types";

export function Select({ name, children, ...props }: SelectProps) {
  const [field] = useField(name);

  return (
    <select {...field} {...props}>
      {children}
    </select>
  );
}
