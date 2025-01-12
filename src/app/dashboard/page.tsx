// src/app/dashboard/page.tsx
import React from 'react';
import Head from 'next/head';
import styles from './page.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>
      <h1>Meu Painel</h1>
    </div>
  );
};

export default Dashboard;
