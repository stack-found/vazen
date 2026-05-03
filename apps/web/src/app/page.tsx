import { Button } from "@repo/ui/button";

export default function Page() {
  return (
    <>
      <div className="flex min-h-svh p-6">
        <div className="flex max-w-xs min-w-0 flex-col gap-4 text-sm">
          <div className="space-y-2">
            <h1 className="text-3xl font-medium">Vazen</h1>
            <p>A strict monorepo starter to kickstart projects, ideas, and experiments.</p>
            <Button className="mt-2">Button</Button>
          </div>
        </div>
      </div>
    </>
  );
}
