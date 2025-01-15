import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import DashboardClient from "@/app/dashboard/DashboardClient";

export const metadata = {
  title: 'Minhas tarefas',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <DashboardClient session={session}/>;
}