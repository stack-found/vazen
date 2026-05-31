import { RPCHandler } from "@orpc/server/fetch";
import { type Context, createContext } from "@repo/rpc/context";
import { appRouter } from "@repo/rpc/routers/index";
import { withEvlog } from "@repo/telemetry/evlog/orpc";

const handler = withEvlog(new RPCHandler<Context>(appRouter));

async function handleRequest(request: Request) {
  const context = {
    ...(await createContext({ headers: request.headers })),
  } as Context;

  const { matched, response } = await handler.handle(request, {
    prefix: "/api/rpc",
    context,
  });

  return matched ? response : new Response("Not found", { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
export const OPTIONS = handleRequest;
