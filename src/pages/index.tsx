import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

import { ButtonNewJob } from '../components/ButtonNewJob'
import { JobsTable } from '../components/JobsTable'

import commomStyles from '../styles/commom.module.scss'
import styles from './home.module.scss'

interface Job {
  id: number;
  project: string;
  deadline: number;
  amount: number;
  status: string;
}

interface HomeProps {
  jobs: Job[]
}

export default function Home({jobs}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | JobsCalc</title>
      </Head>
      <header className={styles.header}>
        <div className={commomStyles.container}>
          <div className={styles.menu}>
            <img src="/logo.svg" alt="logo" />
            <span>
              <img src="/alert-octagon.svg" alt="alert" />
              Você tem 2 horas livres no seu dia
            </span>
            <Link href={'/profile/me'}>
              <a className={styles.perfil}>
                <div>
                  <strong>Jaqueline</strong>
                  <span>Ver perfil</span>
                </div>
                <img src="/perfil.png" alt="perfil" />
              </a>
            </Link>
          </div>
          <div className={styles.summary}>
             <div className={styles.amounts}>
                <div>
                  <strong>12</strong>
                  <span>Projetos ao total</span>
                </div>
                <div>
                  <strong>7</strong>
                  <span>Em andamento</span>
                </div>
                <div>
                  <strong>4</strong>
                  <span>Encerrados</span>
                </div>
             </div>
             <ButtonNewJob />
          </div>
        </div>
      </header>
      <main className={styles.content}>
        <section className={commomStyles.container}>
          <JobsTable jobs={jobs} />
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      jobs:[{
        id: 1,
        project: 'Site George',
        deadline: 259200,
        amount: 280000,
        status: 'InProgress'

    },
    {
        id: 2,
        project: 'Sistema de agendamento',
        deadline: 604800,
        amount: 150000,
        status: 'InProgress'

    }]
    }
  }
}
