import { FormProps } from "./types";
import { FormProvider } from "../context";

export function Form({ methods, children, ...props }: FormProps) {
  return (
    <FormProvider methods={methods}>
      <form
        {...props}
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          methods.handleSubmit();
        }}>
        {children}
      </form>
    </FormProvider>
  );
}
