/** @see https://email-sdk.dev/docs/adapters */
import { createEmailClient } from "@opencoredev/email-sdk";
// import { <adapter-name> } from "@opencoredev/email-sdk/<adapter-name>";

export const email = createEmailClient({
  adapters: [
    //TODO: add your prefered adapter
  ],
});
