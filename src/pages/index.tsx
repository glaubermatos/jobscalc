import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Modal from 'react-modal'

import { ButtonNewJob } from '../components/ButtonNewJob'
import { JobsTable } from '../components/JobsTable'
import { ModalDeleteJob } from '../components/ModalDeleteJob'

import commomStyles from '../styles/commom.module.scss'
import styles from './home.module.scss'

Modal.setAppElement('#root')

interface Job {
  id: number;
  project: string;
  deadline: string;
  amount: string;
  status: string;
}

interface HomeProps {
  jobs: Job[]
}

export default function Home({jobs}: HomeProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenModalDeleteJob() {
    setIsOpen(true)
  }

  function handleCloseModalDeleteJob() {
    setIsOpen(false)
  }

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
          <JobsTable 
            jobs={jobs}
            onOpenModalDeleteJob={handleOpenModalDeleteJob}
          />
        </section>
      </main>
      
      <ModalDeleteJob isOpen={isOpen} onRequestClose={handleCloseModalDeleteJob} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      jobs:[{
        id: 1,
        project: 'Pizzaria Guloso',
        deadline: '3 dias para entrega',
        amount: 'R$ 4.500,00',
        status: 'Em andamento'

    },{
      id: 2,
      project: 'Prust Modas',
      deadline: '6 dias para entrega',
      amount: 'R$ 3.800,00',
      status: 'Em andamento'

  },{
    id: 3,
    project: 'Onetwo Project',
    deadline: '0 horas para entrega',
    amount: 'R$ 2.400,00',
    status: 'Encerrado'

},{
  id: 4,
  project: 'Los Hermanos',
  deadline: '12 dias para entrega',
  amount: 'R$ 1.800,00',
  status: 'Em andamento'

},]
    }
  }
}
