import { defineConfig } from "tsdown";

export default defineConfig({
	 entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    minify: true,
    target: "esnext",
    unbundle: true,
    platform: "node",
    deps:{
        neverBundle: [
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
    }
});