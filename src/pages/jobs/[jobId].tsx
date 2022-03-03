import { FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { toast } from 'react-toastify'


import { formatPrice } from "../../utils/format";

import { backend } from "../api/_lib/services/backend";
import { api } from "../../services/api";

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

    async function updateJob(jobToUpdate: Job) {
        try {
            await api.put(`/profiles/${props.profile.id}/jobs/${job.id}`, jobToUpdate)
            toast.success("Job atualizado");
            
            router.push('/')
        } catch(error) {
            const { data } = error.response
            const problem = data
            console.log(problem.title)

            toast.error('Desculpe! não conseguimos processar sua requisição')
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const jobToUpdate = {
            name,
            workingHoursPerDay: ((workingHoursPerDay * 60) * 60),
            hoursEstimate: ((hoursEstimate * 60) * 60),
            projectValue,
            status
        }

        updateJob(jobToUpdate)
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
            toast.success("Job excluído");
            router.push('/')
        }
      }

    return(
        <>
            <Head>
                <title>Atualizar job | JobsCalc</title>
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
                                        type='number'
                                        label='Quantas horas por dia vai dedicar ao Job?' 
                                        defaultValue={workingHoursPerDay}
                                        onChange={(e) => setWorkingHoursPerDay(Number(e.target.value))}
                                    />
                                    <Input 
                                        type='number'
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
                            <img src="/dolar2.svg" alt="dolar" loading="lazy" />
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
    const response = await backend.get<Job>(`/profiles/${session.activeProfile.id}/jobs/${jobId}`)

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