import { chmod } from "node:fs/promises";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts"],
  banner: {
    js: "#!/usr/bin/env node",
  },
  clean: true,
  dts: false,
  format: "esm",
  platform: "node",
  sourcemap: true,
  hooks: {
    "build:done": async () => {
      await chmod("./dist/index.mjs", 0o755);
    },
  },
});
