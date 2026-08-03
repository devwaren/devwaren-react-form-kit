import { defineConfig } from "tsdown";

export default defineConfig({
    entry: [
        "src/@kit/@tanstack/react-form/index.ts",
        "src/@kit/formik/index.ts",
        "src/@kit/hook-form/index.ts",
        "src/@kit/layouts/index.ts",
        "src/@kit/form-actions/index.ts",
        "src/index.ts"
    ],
    format: ["esm", "cjs"],
    dts: true,
    minify: true,
    target: "esnext",
    unbundle: true,
    platform: "node",
    deps: {
        neverBundle: [
            "fs",
            "fs/promises",
            "path",
            "os",
            "stream",
            "events",
            "node:fs/promises",
            "node:path",
            "node:stream",
            "*.css",
        ],
    },
});