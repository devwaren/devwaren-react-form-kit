import {
  type FieldValues,
  FormProvider,
  type UseFormReturn,
} from "react-hook-form";

type FormProps<T extends FieldValues> = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  methods: UseFormReturn<T>;
  onSubmit: React.ChangeEventHandler<HTMLFormElement>;
  children: React.ReactNode;
};

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
