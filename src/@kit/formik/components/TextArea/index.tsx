import { useField } from "formik";
import type { TextAreaProps } from "./types";

export function TextArea({ name, ...props }: TextAreaProps) {
  const [field] = useField(name);

  return <textarea {...field} {...props} />;
}
