if (typeof window === "undefined") {
    throw new Error(
        "Client-only module imported on the server. Import this module only in client-side code.",
    );
}

export { z as zodClient } from "zod/v3";