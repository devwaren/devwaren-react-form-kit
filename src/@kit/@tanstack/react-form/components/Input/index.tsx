import type { InputHTMLAttributes } from "react";
import { useFormContext } from "../context";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  name: string;
};

export function Input({ name, ...props }: InputProps) {
  const methods = useFormContext();

  return (
    <methods.Field name={name}>
      {field => (
        <input
          {...props}
          name={field.name}
          value={
            typeof field.state.value === "string" ||
            typeof field.state.value === "number"
              ? field.state.value
              : ""
          }
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
        />
      )}
    </methods.Field>
  );
}
