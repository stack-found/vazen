import Link from "next/link";
import { Button } from "@repo/ui/button";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-commitmono text-5xl font-bold">404</h1>
      <p className="mt-2 text-2xl">Page not found</p>

      <Button className="mt-4" nativeButton={false} render={<Link href="/" />}>
        Go to Home
      </Button>
    </main>
  );
}
