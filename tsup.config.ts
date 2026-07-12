import { defineConfig } from "tsup";

export default defineConfig({
	 entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    minify: true,
    target: "esnext",
    bundle: true,
    platform: "node",
    external: [
        'fs',
        'fs/promises',
        'os',
        'stream',
        'events',
        'node:path',
        'node:fs/promises',
        'node:stream',
        'path',
        '*.css'
    ],
});