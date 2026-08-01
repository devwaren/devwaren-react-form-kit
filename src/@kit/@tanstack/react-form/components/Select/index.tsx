import { useFormContext } from "../context";
import type { SelectProps } from "./types";

export function Select({ name, children, ...props }: SelectProps) {
  const methods = useFormContext();

  return (
    <methods.Field name={name}>
      {field => (
        <select
          {...props}
          name={field.name}
          value={String(field.state.value ?? "")}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}>
          {children}
        </select>
      )}
    </methods.Field>
  );
}
