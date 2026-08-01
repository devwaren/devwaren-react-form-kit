import { FormikProvider, FormikValues } from "formik";
import { FormFormikProps } from "./types/index";

export function Form<T extends FormikValues>({
  methods,
  children,
  ...props
}: FormFormikProps<T>) {
  return (
    <FormikProvider value={methods}>
      <form {...props} onSubmit={methods.handleSubmit}>
        {children}
      </form>
    </FormikProvider>
  );
}
