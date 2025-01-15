"use client";

import { ChangeEvent, useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import styles from "./page.module.css";
import { Textarea } from "@/components/textarea/page";
import { FaTrash } from "react-icons/fa";

interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
  userEmail: string;
}

interface TaskProps {
  tarefa: string;
  taskId: string;
  public: boolean;
  created: string;
  user: string;
}

interface TaskComponentProps {
  task: TaskProps;
  allComments: CommentProps[];
}

export default function TaskComponent({
  task,
  allComments,
}: TaskComponentProps) {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState<CommentProps[]>(allComments || []);

  const { data: session } = useSession();

  async function handleComment(event: FormEvent) {
    event.preventDefault();
    if (input === "") return;
    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.name,
        userEmail: session?.user?.email,
        taskId: task.taskId,
      });

      // Adiciona o novo comentário ao estado local
      const newComment: CommentProps = {
        id: docRef.id,
        comment: input,
        taskId: task.taskId,
        user: session.user.email,
        name: session.user.name,
        userEmail: session.user.email,
      };

      setComments([...comments, newComment]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteComment(id: string) {
    try {
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);

      const deleteComment = comments.filter((comment) => comment.id !== id);

      setComments(deleteComment);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{task.tarefa}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixe seu comentário</h2>

        <form onSubmit={handleComment}>
          <Textarea
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
            placeholder="Digite seu comentário..."
          />
          <button disabled={!session?.user} className={styles.button}>
            Enviar comentário
          </button>
        </form>
      </section>

      <section className={styles.commentsContainer}>
        <h2>Todos os Comentários</h2>
        {comments.length === 0 && <span>Nenhum comentário encontrado</span>}

        {comments.map((comment) => (
          <article key={comment.id} className={styles.comment}>
            <div className={styles.headComment}>
              <label className={styles.commentLabel}>{comment.user}</label>
              {comment.userEmail === session?.user?.email && (
                <button
                  className={styles.buttonTrash}
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <FaTrash size={18} color="#ea3140" />
                </button>
              )}
            </div>
            <p>{comment.comment}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
