import { FormikValues } from "formik";
import { InputProps } from "./types";

export function Input<T extends FormikValues>({
  name,
  formik,
  ...props
}: InputProps<T>) {
  return <input {...formik.getFieldProps(name)} {...props} />;
}
