import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

if (typeof window === "undefined") {
    throw new Error(
        "cn is client-only and cannot be used during SSR.",
    );
}

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

export { cn };
