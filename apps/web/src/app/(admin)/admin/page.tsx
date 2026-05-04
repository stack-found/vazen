import { redirect } from "next/navigation";
import Dashboard from "./dashboard";
import { headers } from "next/headers";
import { auth } from "@repo/auth/server";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <>
      <Suspense>
        <DashboardContent />
      </Suspense>
    </>
  );
}

async function DashboardContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/auth/login");
  if (session.user.role !== "admin") redirect("/");

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session.user.name}</p>
      <Dashboard session={session} />
    </div>
  );
}
