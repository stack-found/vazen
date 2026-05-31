import type { RouterClient } from "@orpc/server";
import { protectedProcedure, publicProcedure } from "../orpc";

export const appRouter = {
  health: publicProcedure.handler(({ context }) => {
    context.log.set({ route: "health" });
    return { ok: true };
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.user,
    };
  }),
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<AppRouter>;
