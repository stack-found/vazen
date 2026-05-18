import { Icons } from "./ui/icons";
import { StackPill } from "./ui/stack-pill";

const stacks = [
  {
    icon: <Icons.Nextjs className="size-4" />,
    stackName: "Next.js",
  },
  {
    icon: <Icons.Reactjs className="size-4" />,
    stackName: "React.js",
  },
  {
    icon: <Icons.TailwindCSS className="size-4" />,
    stackName: "Tailwind CSS",
  },
  {
    icon: <Icons.TanstackQuery className="size-4" />,
    stackName: "Tanstack Query",
  },
  {
    icon: <Icons.Posthog className="size-4" />,
    stackName: "Posthog",
  },
  {
    icon: <Icons.Typescript className="size-4" />,
    stackName: "Typescript",
  },
  {
    icon: <Icons.ORPC className="size-4" />,
    stackName: "oRPC",
  },
  {
    icon: <Icons.Postgres className="size-4" />,
    stackName: "PostgreSQL",
  },
  // {
  //   icon: <Icons.Polar className="size-4" />,
  //   stackName: "Polar",
  // },
  {
    icon: <Icons.Drizzle className="size-4" />,
    stackName: "Drizzle ORM",
  },
  {
    icon: <Icons.BetterAuth className="size-4" />,
    stackName: "Better Auth",
  },
  {
    icon: <Icons.ReactEmail className="size-4" />,
    stackName: "React Email",
  },
  {
    icon: <Icons.Statsig className="size-4" />,
    stackName: "Statsig",
  },
  {
    icon: <Icons.Sentry className="size-4" />,
    stackName: "Sentry",
  },
  {
    icon: <Icons.Evlog className="size-4" />,
    stackName: "Evlog",
  },
  {
    icon: <Icons.Playwright className="size-4" />,
    stackName: "Playwright",
  },
  // {
  //   icon: <Icons.C15T className="size-4" />,
  //   stackName: "c15t",
  // },
];
export default function TechStackSet() {
  return (
    <div className="mx-auto flex max-w-[780px] flex-wrap items-center justify-center gap-4">
      {stacks.map((stack, idx) => {
        return <StackPill key={idx} icon={stack.icon} stackName={stack.stackName} />;
      })}
    </div>
  );
}
