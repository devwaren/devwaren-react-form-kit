import { FormikProvider, type FormikProps, type FormikValues } from "formik";

type FormFormikProps<T extends FormikValues> = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  methods: FormikProps<T>;
  children: React.ReactNode;
};

export function FormFormik<T extends FormikValues>({
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
