import type { FieldValues, Path } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { LucideIcon } from "lucide-react";

export type InputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  icon?: LucideIcon;
  right?: boolean;
};

export const FormInput = <T extends FieldValues>({
  name,
  type = "text",
  placeholder,
  className,
  icon: LeftIcon,
  right,
}: InputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full space-y-1">
      <div className="relative">
        {LeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <LeftIcon size={18} className="text-gray-400" />
          </div>
        )}

        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={[
            "peer w-full rounded-md border bg-white py-2 text-sm outline-none transition-all",
            LeftIcon ? "pl-10" : "pl-4",
            right ? "pr-10" : "pr-4",
            error
              ? "border-red-500 focus:ring-red-500/20"
              : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />

        {right && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {right}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
