import { source } from "@/lib/fuma/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/fuma/layout.shared";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
