import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Modal from 'react-modal'

import { ButtonNewJob } from '../components/ButtonNewJob'
import { JobsTable } from '../components/JobsTable'
import { ModalDeleteJob } from '../components/ModalDeleteJob'
import { api } from '../services/api'

import commomStyles from '../styles/commom.module.scss'
import styles from './home.module.scss'

Modal.setAppElement('#root')

interface Job {
  id: number;
  name: string;
  deadline: string;
  amount: string;
  status: string;
}

interface ProfileJobs {
  totalProjects: number;
  totalProjectsInProgress: number;
  totalProjectsClosed: number;
  jobs: Job[];
}

interface HomeProps {
  profileJobs: ProfileJobs;
}

export default function Home({profileJobs}: HomeProps) {
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
                  <strong>{profileJobs.totalProjects}</strong>
                  <span>Projetos ao total</span>
                </div>
                <div>
                  <strong>{profileJobs.totalProjectsInProgress}</strong>
                  <span>Em andamento</span>
                </div>
                <div>
                  <strong>{profileJobs.totalProjectsClosed}</strong>
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
            jobs={profileJobs.jobs}
            onOpenModalDeleteJob={handleOpenModalDeleteJob}
          />
        </section>
      </main>
      
      <ModalDeleteJob isOpen={isOpen} onRequestClose={handleCloseModalDeleteJob} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await api.get('/profile/1/jobs')

  const jobWrapper = await response.data

  const { 
    totalProjects, 
    totalProjectsInProgress, 
    totalProjectsClosed, 
    jobs 
  } = jobWrapper;

  const jobsFormated = jobs.map(job => {
    return {
      id: job.id,
      name: job.name,
      deadline: job.deadline,
      amount: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(job.projectValue / 100),
      status: job.status
    }
  })

  const profileJobs = {
    totalProjects,
    totalProjectsInProgress,
    totalProjectsClosed,
    jobs: jobsFormated
    // [
    //   {
    //     id: 1,
    //     name: 'Pizzaria Guloso',
    //     deadline: '3 dias para entrega',
    //     amount: 'R$ 4.500,00',
    //     status: 'Em andamento'
    //   },
    //   {
    //     id: 2,
    //     name: 'Prust Modas',
    //     deadline: '6 dias para entrega',
    //     amount: 'R$ 3.800,00',
    //     status: 'Em andamento'
    //   },
    //   {
    //     id: 3,
    //     name: 'Onetwo Project',
    //     deadline: '0 horas para entrega',
    //     amount: 'R$ 2.400,00',
    //     status: 'Encerrado'
    //   },
    //   {
    //     id: 4,
    //     name: 'Los Hermanos',
    //     deadline: '12 dias para entrega',
    //     amount: 'R$ 1.800,00',
    //     status: 'Em andamento'
    //   }
    // ]
  }

  return {
    props: {
      profileJobs
    }
  }
}