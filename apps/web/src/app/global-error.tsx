"use client";

import { useEffect } from "react";
import { fontsVariable } from "@repo/ui/fonts";
import { Button } from "@repo/ui/components/button";
import * as Sentry from "@sentry/nextjs";

interface GlobalErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { area: "global-error" },
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <html lang="en" className={fontsVariable}>
      <body className="flex min-h-screen flex-col items-center justify-center">
        <div className="space-y-3 text-center">
          <div>
            <h1>Something went wrong!</h1>
          </div>
          <Button onClick={reset}>Refresh</Button>
        </div>
      </body>
    </html>
  );
}
