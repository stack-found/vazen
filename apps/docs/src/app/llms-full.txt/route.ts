import { getLLMText, source } from "@/lib/fuma/source";

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join("\n\n"));
}
