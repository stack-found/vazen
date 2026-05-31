import { ORPCError, os } from "@orpc/server";
import type { Context } from "./context";
import { initLogger } from "@repo/telemetry/evlog";
import { evlog } from "@repo/telemetry/evlog/orpc";

initLogger({
  env: { service: "vazen-web" },
  pretty: process.env.NODE_ENV !== "production",
});

export const base = os.$context<Context>().use(evlog());
export const publicProcedure = base;

export const protectedProcedure = publicProcedure.use(({ context, next }) => {
  if (!context.user) {
    throw new ORPCError("UNAUTHORIZED");
  }

  return next({
    context: {
      session: context.session,
      user: context.user,
    },
  });
});

export const adminProcedure = publicProcedure.use(({ context, next }) => {
  if (!context.session || !context.user) {
    throw new ORPCError("UNAUTHORIZED");
  }

  if (context.user.role !== "admin") {
    throw new ORPCError("FORBIDDEN", { message: "You don't have right permission" });
  }

  return next({
    context: {
      session: context.session,
      user: context.user,
    },
  });
});
