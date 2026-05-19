import { Files } from "files-sdk";
import { r2 } from "files-sdk/r2";
import { env } from "#env";

export const files = new Files({
  adapter: r2({
    bucket: "your_bucket_name",
    accountId: env().R2_ACCOUNT_ID,
    accessKeyId: env().R2_ACCESS_KEY_ID,
    secretAccessKey: env().R2_SECRET_ACCESS_KEY,

    /**
     * Origin used to build URLs from `url()` — typically an `r2.dev`
     * subdomain or a custom domain bound to the bucket. When set, `url()`
     * returns `${publicBaseUrl}/${key}` and skips signing. When unset,
     * `url()` returns a presigned GetObject URL (default expiry: 1 hour).
     */
    // publicBaseUrl?: string;

    /**
     * Default expiry, in seconds, for `url()` when `publicBaseUrl` is unset.
     * Defaults to 3600.
     */
    // defaultUrlExpiresIn?: number;
  }),
});
