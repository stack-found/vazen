import { log } from "@repo/telemetry/evlog";
import { type EmailMessage } from "@opencoredev/email-sdk";

type MockableEmailOptions = EmailMessage & {
  _mockContext?: {
    type: "magic-email";
    data: Record<string, unknown>;
  };
};

export async function sendDevEmail(options: MockableEmailOptions) {
  log.info({
    event: "email.mock_send",
    email: {
      from: options.from,
      to: options.to,
      subject: options.subject,
    },
    mock: options._mockContext
      ? {
          type: options._mockContext.type,
          data: options._mockContext.data,
        }
      : undefined,
  });

  return { data: { id: "mock-email-id" }, error: null };
}
