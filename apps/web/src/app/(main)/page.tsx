import APIHealth from "@/components/api-health";
import { Button } from "@repo/ui/button";

export default function Page() {
  return (
    <>
      <div className="flex min-h-svh p-6">
        <div className="flex flex-col gap-4 text-sm">
          <div className="space-y-2">
            <h1 className="font-asul text-3xl font-medium">Vazen</h1>
            <p className="max-w-xs min-w-0">
              A strict monorepo starter to kickstart projects, ideas, and experiments.
            </p>
            <div className="flex items-center gap-3">
              <Button>Button</Button>
              <APIHealth />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
