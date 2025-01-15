import { Metadata } from "next";
import TaskComponent from "./TaskComponent";
import { db } from "@/services/firebaseConnection";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";

interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
  userEmail: string; 
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Detalhes da tarefa",
  };
}

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
      comment: doc.data()?.comment,
      user: doc.data()?.user,
      name: doc.data()?.name,
      taskId: doc.data()?.taskId,
      userEmail: doc.data()?.userEmail,
    });
  });

  const milliseconds = snapshot.data()?.created?.seconds * 1000;

  return {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created: new Date(milliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
    userEmail: snapshot.data()?.userEmail,
    allComments,
  };
}

// Componente da página
const Page = async ({ params }: { params: { id: string } }) => {
  const task = await fetchTaskData(params.id);
  return <TaskComponent task={task} allComments={task.allComments} />;
};

export default Page;
