import posthog from "posthog-js";
import { env } from "../env";

export const initializeAnalytics = () => {
  posthog.init(env().NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env().NEXT_PUBLIC_POSTHOG_HOST,
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
  });
};

export { usePostHog } from "posthog-js/react";
