"use client";

import { Suspense } from "react";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { Button } from "@repo/ui/components/button";

const ERROR_MESSAGES: Record<string, { title: string; description: string }> = {
  account_already_linked_to_different_user: {
    title: "account already linked",
    description: "this social account is already connected to another user",
  },
  unable_to_link_account: {
    title: "unable to link account",
    description: "the provider email may not be verified or already exists",
  },
  unable_to_get_user_info: {
    title: "provider error",
    description: "could not retrieve your info from the provider",
  },
  "email_doesn't_match": {
    title: "email mismatch",
    description: "provider email does not match your account",
  },
  email_not_found: {
    title: "email not found",
    description: "no account found with this email",
  },
  oauth_provider_not_found: {
    title: "provider not available",
    description: "this sign in method is not configured",
  },
  signup_disabled: {
    title: "sign up disabled",
    description: "new registrations are currently disabled",
  },
  no_callback_url: {
    title: "missing callback",
    description: "sign in flow was interrupted",
  },
  no_code: {
    title: "authorization failed",
    description: "no authorization code received",
  },
  state_mismatch: {
    title: "security check failed",
    description: "request expired or invalid",
  },
  state_not_found: {
    title: "session expired",
    description: "please start sign in again",
  },
  invalid_callback_request: {
    title: "invalid request",
    description: "callback request was invalid",
  },
};

const DEFAULT_ERROR = {
  title: "Authentication Error",
  description: "something went wrong during sign in",
};

function AuthErrorPage() {
  const [errorCode] = useQueryState("error", parseAsString.withDefault(""));
  const errorInfo = ERROR_MESSAGES[errorCode] ?? DEFAULT_ERROR;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-xl font-medium">{errorInfo.title}</h1>
          <p className="text-muted-foreground text-sm">{errorInfo.description}</p>
        </div>

        {errorCode && <code className="text-muted-foreground block text-xs">{errorCode}</code>}

        <div className="mx-auto w-1/2 space-y-2">
          <Button
            nativeButton={false}
            render={<Link href="/auth/login">back to login</Link>}
            className="w-full"
          />
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/">go home</Link>}
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-40 items-center justify-center">
          <div className="border-muted border-t-foreground size-5 animate-spin rounded-full border-2" />
        </div>
      }
    >
      <AuthErrorPage />
    </Suspense>
  );
}
