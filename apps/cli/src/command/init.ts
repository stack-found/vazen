import { z } from "zod";

export const initOptionsSchema = z.object({
  yes: z.boolean().optional().default(false).describe("use default config"),
});

export const init = (opts: z.infer<typeof initOptionsSchema>) => {
  console.log(opts.yes);
};
