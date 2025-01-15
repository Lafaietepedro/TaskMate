import Image from "next/image";
import styles from "./page.module.css";
import Head from "next/head";

import { Metadata } from "next";

import { db } from "@/services/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";

import heroImg from "../../public/assets/hero.png";

export const metadata: Metadata = {
  title: "Tarefas+ | Organize suas tarefas de forma fácil",
  icons: {
    icon: "/assets/task.png",
  },
};

// Definindo a interface HomeProps
interface HomeProps {
  posts: number;
  comments: number;
}

// Componente da Home
export default async function Home() {
  // Fetch de dados diretamente no componente
  const commentRef = collection(db, "comments");
  const postRef = collection(db, "tarefas");

  const commentsSnapshot = await getDocs(commentRef);
  const postSnapshot = await getDocs(postRef);

  const posts = postSnapshot.size || 0;
  const comments = commentsSnapshot.size || 0;

  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefas+ | Organize suas tarefas de forma fácil</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Logo Tarefas+"
            src={heroImg}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Transforme sua lista de tarefas <br /> em metas alcançadas.
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{posts} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{comments} comentários</span>
          </section>
        </div>
      </main>
    </div>
  );
}
