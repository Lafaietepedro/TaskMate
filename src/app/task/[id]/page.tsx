import { Metadata } from "next";
import TaskComponent from "./TaskComponent";
import { db } from "@/services/firebaseConnection";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";

// Define the shape of a comment
interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
  userEmail: string;
}

// Metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Detalhes da tarefa ${params.id}`,
  };
}

// Function to fetch task data
async function fetchTaskData(id: string) {
  const docRef = doc(db, "tarefas", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists() || !snapshot.data()?.public) {
    throw new Error("Task not found or not public");
  }

  const q = query(collection(db, "comments"), where("taskId", "==", id));
  const snapshotComments = await getDocs(q);

  const allComments: CommentProps[] = [];
  snapshotComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data()?.comment ?? "",
      user: doc.data()?.user ?? "",
      name: doc.data()?.name ?? "",
      taskId: doc.data()?.taskId ?? "",
      userEmail: doc.data()?.userEmail ?? "",
    });
  });

  const createdTimestamp = snapshot.data()?.created?.seconds;
  const createdDate = createdTimestamp
    ? new Date(createdTimestamp * 1000).toLocaleDateString()
    : "Data desconhecida";

  return {
    tarefa: snapshot.data()?.tarefa ?? "",
    public: snapshot.data()?.public ?? false,
    created: createdDate,
    user: snapshot.data()?.user ?? "",
    taskId: id,
    userEmail: snapshot.data()?.userEmail ?? "",
    allComments,
  };
}

// Define a uniquely named interface for props
interface TaskPageProps {
  params: {
    id: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

// Define the Page component as an async function
export default async function Page({ params, searchParams }: TaskPageProps) {
  const task = await fetchTaskData(params.id);
  return <TaskComponent task={task} allComments={task.allComments} />;
}
