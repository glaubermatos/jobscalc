import { FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { api } from "../../services/api";

import { formatPrice } from "../../utils/format";

import { CardProjectAmount } from "../../components/CardProjectAmount";
import { Header } from "../../components/Header";
import { ModalDeleteJob } from "../../components/ModalDeleteJob";
import { StatusJob } from "../../components/StatusJob";

import { Input } from "../../shared/Input";

import commomStyles from '../../styles/commom.module.scss'
import styles from './styles.module.scss'

interface Job {
    id?: number;
    name: string;
    workingHoursPerDay: number,
    hoursEstimate: number,
    projectValue: number,
    status: string,
}

interface Profile {
    id: number;
    workingHoursPerDay: number;
    valueHour: number;
}

interface JobProps {
    job: Job;
    profile: Profile;
}

export default function Job(props: JobProps) {
    const router = useRouter()    

    const [isModalDeleteJobOpen, setIsModalDeleteJobOpen] = useState(false)

    const [job, setJob] = useState(props.job)

    const [name, setName] = useState(job.name)
    const [workingHoursPerDay, setWorkingHoursPerDay] = useState<number>(job.workingHoursPerDay)
    const [hoursEstimate, setHoursEstimate] = useState<number>(job.hoursEstimate)
    const [projectValue, setProjectValue] = useState<number>(job.projectValue)
    const [status, setStatus] = useState(job.status)

    useEffect(() => {
        if (hoursEstimate) {
            const valueHour = props.profile.valueHour
            const value = hoursEstimate * valueHour
            setProjectValue(value)
        } else {
            setProjectValue(null)
        }
        
    }, [hoursEstimate])

    async function createNewJob(newJob: Job) {
        try {
            await api.put(`/profiles/${props.profile.id}/jobs/${job.id}`, newJob)
            router.push('/')
            alert('Job salvo com sucesso')
        } catch(error) {
            console.log(error)
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const newJob = {
            name,
            workingHoursPerDay: ((workingHoursPerDay * 60) * 60),
            hoursEstimate: ((hoursEstimate * 60) * 60),
            projectValue,
            status
        }

        createNewJob(newJob)
    }

    function handleOpenModalDeleteJob() {
        setIsModalDeleteJobOpen(true)
      }
    
      function handleCloseModalDeleteJob() {
        setIsModalDeleteJobOpen(false)
      }

      async function handleDeleteJob() {
        const response = await api.delete(`/profiles/${props.profile.id}/jobs/${job.id}`)
    
        if (response.status === 204) {
          alert('Job excluído com sucesso.')
          router.push('/')
        }
      }

    return(
        <>
            <Head>
                <title>Adicionar novo job | JobsCalc</title>
            </Head>
            <Header title="Editar Job" />
            <main className={commomStyles.wrapper}>
                <section className={commomStyles.container}>
                    <form
                        onSubmit={handleSubmit}
                        className={styles.formContainer}
                    >
                        <div className={styles.jobsData}>
                            <div className={styles.fieldGroup}>
                                <h3>Dados do Job</h3>
                                <StatusJob 
                                    job={{
                                        id: job.id,
                                        status
                                    }} 
                                    onChangeStatus={setStatus}
                                />
                                <div className={styles.row}>
                                    <Input
                                        label='Nome do Job' 
                                        defaultValue={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.grid2}>
                                    <Input 
                                        label='Quantas horas por dia vai dedicar ao Job?' 
                                        defaultValue={workingHoursPerDay}
                                        onChange={(e) => setWorkingHoursPerDay(Number(e.target.value))}
                                    />
                                    <Input 
                                        label='Estimativa de horas para esse job'
                                        defaultValue={hoursEstimate}
                                        onChange={(e) => setHoursEstimate(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <CardProjectAmount
                            largeFontSize 
                            onOpenModalDeleteJob={handleOpenModalDeleteJob}
                        >
                            <img src="/dolar2.svg" alt="dolar" />
                            <p>O valor do projeto ficou em <strong>{formatPrice(projectValue / 100)} reais</strong></p>
                        </CardProjectAmount> 
                        
                    </form>
                </section>
            </main>

            <ModalDeleteJob 
                isOpen={isModalDeleteJobOpen} 
                onRequestClose={handleCloseModalDeleteJob}
                jobForDeletion={{id: job.id, name: job.name}}
                onDeleteJob={handleDeleteJob}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const session = await getSession({req})

    if (!session?.user) {
        return {
            redirect: {
            destination: '/signin',
            permanent: false
            }
        }
    }
    
    const jobId = params.jobId
    const response = await api.get<Job>(`/profiles/${session.activeProfile.id}/jobs/${jobId}`)

    const job = response.data
    
    return {
        props: {
            job: {
                ...job,
                workingHoursPerDay: job.workingHoursPerDay / 60 / 60,
                hoursEstimate: job.hoursEstimate / 60 / 60,
            },
            profile: session.activeProfile
        }
    }
}