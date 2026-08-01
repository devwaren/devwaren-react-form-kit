import type { FormApi } from "@tanstack/react-form";

import { useForm } from "@tanstack/react-form";

type FormMethods = ReturnType<typeof useForm>;

type InputProps = {
  methods: FormMethods;
  name: string;
};

export function Input<T>({ methods, name }: InputProps) {
  return (
    <methods.Field name={name}>
      {field => (
        <input
          name={field.name}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
        />
      )}
    </methods.Field>
  );
}
