import { createContext, useContext, type ReactNode } from "react";
import { useForm } from "@tanstack/react-form";

type FormMethods = ReturnType<typeof useForm>;

const FormContext = createContext<FormMethods | null>(null);

type FormProviderProps = {
  methods: FormMethods;
  children: ReactNode;
};

export function TanstackFormProvider({ methods, children }: FormProviderProps) {
  return (
    <FormContext.Provider value={methods}>{children}</FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider.");
  }

  return context;
}
