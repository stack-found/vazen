import { init, initOptionsSchema } from "@/command/init";
import packageJson from "../package.json";
import { os } from "@orpc/server";
import { createCli } from "trpc-cli";

const router = os.router({
  init: os
    .meta({ description: "" })
    .input(initOptionsSchema)
    .handler(({ input }) => {
      return init(input);
    }),
});

createCli({
  router,
  name: "vazen",
  version: packageJson.version,
}).run();
