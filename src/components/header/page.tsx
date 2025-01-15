import Link from "next/link";
import styles from "./page.module.css";

import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>
              Task
              <span>Mate</span>
            </h1>
          </Link>
          {session?.user && (
            <Link href="/dashboard" className={styles.link}>
            {" "}
            Meu Painel
          </Link>
          )}
        </nav>

        {status === "loading" ? (
          <></>
        ) : session ? (
          <button className={styles.loginButton} onClick={() => signOut()}>
            Olá {session?.user?.name}
          </button>
        ) : (
          <button
            className={styles.loginButton}
            onClick={() => signIn("google")}
          >
            Acessar
          </button>
        )}
      </section>
    </header>
  );
};

export default Header;
