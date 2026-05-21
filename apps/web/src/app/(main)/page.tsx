import APIHealth from "@/components/api-health";
import { bannerFlag } from "@repo/flags/feature";
import { Button } from "@repo/ui/components/button";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense>
        <Banner />
      </Suspense>
      <div className="flex p-6">
        <div className="flex flex-col gap-4 text-sm">
          <div className="space-y-2">
            <h1 className="font-asul text-3xl font-medium">Vazen</h1>
            <p className="max-w-xs min-w-0">
              The production-grade starter kit for modern full-stack applications
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

async function Banner() {
  const isBannerEnabled = await bannerFlag();

  if (isBannerEnabled) {
    return (
      <>
        <div className="bg-black py-1 text-center text-sm text-white">
          <p>
            Banner enabled by feature flag: <code>enable_banner_flag</code>
          </p>
        </div>
      </>
    );
  }

  return null;
}
