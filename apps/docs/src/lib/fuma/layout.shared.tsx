import { Icons } from "@/components/ui/icons";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Icons.Logo className="size-6" />
          <span className="font-asul text-2xl">Vazen</span>
        </div>
      ),
    },
    githubUrl: "https://github.com/stack-found/vazen",
  };
}
