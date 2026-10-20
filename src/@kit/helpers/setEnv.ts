declare global {
    interface ImportMetaEnv {
        [key: string]: string | boolean | undefined;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}

export const setEnv = (key: string): string => {

    const FORBIDDEN_ENV_PATTERN = /SECRET|KEY|PRIVATE|PASSWORD|CREDENTIAL|TOKEN/i;

    if (!key.startsWith("VITE_")) {
        throw new Error(
            `Invalid client environment variable: ${key}. The name must start with VITE_.`,
        );
    }

    if (FORBIDDEN_ENV_PATTERN.test(key)) {
        throw new Error(
            `Forbidden client environment variable: ${key}. Sensitive variables must remain server-side.`,
        );
    }

    const value = import.meta.env[key];

    if (typeof value !== "string" || !value) {
        throw new Error(
            `Missing required client environment variable: ${key}`,
        );
    }

    return value;
};