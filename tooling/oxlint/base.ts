import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "oxc"],
  options: {
    typeAware: true,
  },
});
