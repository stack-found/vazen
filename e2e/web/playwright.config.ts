import path from "node:path";
import { fileURLToPath } from "node:url";
import { createPlaywrightSuiteConfig } from "@repo/playwright";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

export default createPlaywrightSuiteConfig({
  appName: "web",
  suiteDir: currentDir,
});
