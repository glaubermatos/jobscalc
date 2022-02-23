import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

import { toast } from 'react-toastify';

import { api } from '../services/api'
import { formatPrice } from '../utils/format'

import { ButtonNewJob } from '../components/ButtonNewJob'
import { JobsTable } from '../components/JobsTable'
import { ModalDeleteJob } from '../components/ModalDeleteJob'
import { Profile } from '../components/Profile'

import commomStyles from '../styles/commom.module.scss'
import styles from './home.module.scss'

interface Profile {
  id: number;
	email: string;
	name: string;
	avatarUrl: string;
}

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

interface JobForDeletion {
  id: number, 
  name: string
}

interface HomeProps {
  profile: Profile;
  profileJobs: ProfileJobs;
}

export default function Home(props: HomeProps) {
  const profile = props.profile
  const [profileJobs, setProfileJobs] = useState(props.profileJobs)
  
  const [isOpen, setIsOpen] = useState(false)
  
  const [jobForDeletion, setJobForDeletion] = useState<JobForDeletion>({} as JobForDeletion)

  function handleOpenModalDeleteJob(job: Job) {
    setIsOpen(true)
    setJobForDeletion(job)
  }

  function handleCloseModalDeleteJob() {
    setIsOpen(false)
  }

  async function handleDeleteJob(job: Job) {
    const response = await api.delete(`/profiles/${profile.id}/jobs/${job.id}`)

    if (response.status === 204) {
      toast.success("Job excluído");
      
      const response = await api.get(`/profiles/${profile.id}/jobs`)

      const jobsFormated = response.data.jobs.map((job) => {
        return {
          ...job,
          deadline: job.deadline,
          amount: formatPrice(job.projectValue / 100),
        }
      })

      setProfileJobs({
        ...response.data,
        jobs: jobsFormated
      })
    }
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
            {/* <span>
              <img src="/alert-octagon.svg" alt="alert" />
              Você tem 2 horas livres no seu dia
            </span> */}
            <Profile
            profile={{
              email: profile.email, 
              name: profile.name, 
              avatarUrl: profile.avatarUrl
            }} />
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
            profileId={profile.id}
            jobs={profileJobs.jobs}
            onOpenModalDeleteJob={handleOpenModalDeleteJob}
          />
        </section>
      </main>
      
      <ModalDeleteJob 
        isOpen={isOpen} 
        onRequestClose={handleCloseModalDeleteJob}
        jobForDeletion={jobForDeletion}
        onDeleteJob={handleDeleteJob}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session = await getSession({req})
  
  if (!session?.user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  if (!session.activeProfile) {
    return {
      redirect: {
        destination: '/profile/me',// pode ser criado uma rota especifica para criação de novos perfis de usuário
        permanent: false,
      }
    }
  }

  const responseJobs = await api.get(`/profiles/${session?.activeProfile?.id}/jobs`)

  const jobWrapper = await responseJobs.data

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
      amount: formatPrice(job.projectValue / 100),
      status: job.status
    }
  })

  const profileJobs = {
    totalProjects,
    totalProjectsInProgress,
    totalProjectsClosed,
    jobs: jobsFormated
  }

  return {
    props: {
      profile: session.activeProfile,
      profileJobs
    }
  }
}