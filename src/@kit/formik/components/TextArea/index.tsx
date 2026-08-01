import { useField } from "formik";
import { TextAreaProps } from "./types";

export function TextArea({ name, ...props }: TextAreaProps) {
  const [field] = useField(name);

  return <textarea {...field} {...props} />;
}
