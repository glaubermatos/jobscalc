import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { CardProjectAmount } from "../../components/CardProjectAmount";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Input } from "../../shared/Input";

import commomStyles from '../../styles/commom.module.scss'
import styles from './styles.module.scss'

interface Job {
    id: number;
    name: string;
    workingHoursPerDay: number,
    hoursEstimate: number,
    projectValue: number
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

    const [job, setJob] = useState(props.job)

    const [name, setName] = useState(job.name)
    const [workingHoursPerDay, setWorkingHoursPerDay] = useState<number>(job.workingHoursPerDay)
    const [hoursEstimate, setHoursEstimate] = useState<number>(job.hoursEstimate)
    const [projectValue, setProjectValue] = useState<number>(job.projectValue)

    return(
        <>
            <Head>
                <title>Adicionar novo job | JobsCalc</title>
            </Head>
            <Header title="Editar Job" />
            <main className={commomStyles.wrapper}>
                <section className={commomStyles.container}>
                    <form action="#" className={styles.formContainer}>
                        
                        <div className={styles.jobsData}>
                            <div className={styles.fieldGroup}>
                                <h3>Dados do Job</h3>
                                <div className={styles.row}>
                                    <Input
                                        label='Nome do Job' 
                                        defaultValue={name}
                                    />
                                </div>
                                <div className={styles.grid2}>
                                    <Input 
                                        label='Quantas horas por dia vai dedicar ao Job?' 
                                        defaultValue={workingHoursPerDay}
                                    />
                                    <Input 
                                        label='Estimativa de horas para esse job'
                                        defaultValue={hoursEstimate}
                                    />
                                </div>
                            </div>
                        </div>

                        <CardProjectAmount largeFontSize>
                            <img src="/dolar2.svg" alt="dolar" />
                            <p>O valor do projeto ficou em <strong>{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(job.projectValue / 100)} reais</strong></p>
                        </CardProjectAmount> 
                        
                    </form>
                </section>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const responseProfile = await api.get('/profiles/glaub.oliveira@hotmail.com')
    const profile = responseProfile.data
    
    const jobId = params.jobId
    const response = await api.get<Job>(`/profiles/1/jobs/${jobId}`)

    const job = response.data
    
    return {
        props: {
            job: {
                ...job,
                workingHoursPerDay: job.workingHoursPerDay / 60 / 60,
                hoursEstimate: job.hoursEstimate / 60 / 60,
            },
            profile
        }
    }
}