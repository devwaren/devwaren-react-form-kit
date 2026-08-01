import { FormProps } from "./types";
import { TanstackFormProvider } from "../context";

export function Form({ methods, children, ...props }: FormProps) {
  return (
    <TanstackFormProvider methods={methods}>
      <form
        {...props}
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          methods.handleSubmit();
        }}>
        {children}
      </form>
    </TanstackFormProvider>
  );
}
