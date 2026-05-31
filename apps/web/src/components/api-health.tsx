"use client";

import { orpc } from "@/lib/orpc/client";
import { useQuery } from "@tanstack/react-query";

export default function APIHealth() {
  const { data, isPending, isError } = useQuery(orpc.health.queryOptions());

  return (
    <div className="flex items-center gap-3">
      <h1>API Health :</h1>
      {isPending ? (
        <div className="h-4 w-6 animate-pulse rounded-sm bg-neutral-200" />
      ) : (
        <p className="font-commitmono">{data?.ok ? "OK" : "NOT OK"}</p>
      )}
      {isError && <p className="text-destructive">{"[API]"} Failed to fetch API Health!</p>}
    </div>
  );
}
