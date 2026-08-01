import { useFormContext } from "../context";
import type { TextAreaProps } from "./types";

export function TextArea({ name, ...props }: TextAreaProps) {
  const methods = useFormContext();

  return (
    <methods.Field name={name}>
      {field => (
        <textarea
          {...props}
          name={field.name}
          value={String(field.state.value ?? "")}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
        />
      )}
    </methods.Field>
  );
}
