import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { type AppRouterClient } from "@repo/rpc/contract";

declare global {
  var $client: AppRouterClient | undefined;
}

const link = new RPCLink({
  url: () => {
    if (typeof window === "undefined") {
      throw new Error("RPCLink is not allowed on the server side.");
    }

    return `${window.location.origin}/api/rpc`;
  },
});

/**
 * Fallback to client-side client if server-side client is not available.
 */
export const client: AppRouterClient = globalThis.$client ?? createORPCClient(link);
export const orpc = createTanstackQueryUtils(client);
