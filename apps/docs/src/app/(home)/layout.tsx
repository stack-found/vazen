import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/fuma/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
