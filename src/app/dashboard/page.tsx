import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import DashboardClient from "@/app/dashboard/DashboardClient";


// app/pagina/page.tsx
export const metadata = {
  title: 'Minhas tarefas',
}
interface HomeProps {
  user: {
    email: string;
  }
}

export default async function DashboardPage({user}: HomeProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <DashboardClient session={session}/>;
}
