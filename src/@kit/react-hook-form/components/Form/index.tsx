import { FieldValues, FormProvider } from "react-hook-form";
import { FormProps } from "./types";

export function Form<T extends FieldValues>({
  methods,
  onSubmit,
  children,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <form {...props} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  );
}
