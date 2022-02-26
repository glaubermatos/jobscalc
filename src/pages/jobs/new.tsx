import { FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router'
import Head from "next/head";

import { toast } from 'react-toastify';

import { formatPrice } from "../../utils/format";

import { CardProjectAmount } from "../../components/CardProjectAmount";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Input } from "../../shared/Input";

import commomStyles from '../../styles/commom.module.scss'
import styles from './styles.module.scss'
import { getSession } from "next-auth/react";
import { saveNewJob } from "../api/_lib/manageJob";

interface Job {
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

interface NewJobProps {
    profile: Profile
}

export default function NewJob({profile}: NewJobProps) {

    const router = useRouter()

    const [name, setName] = useState('')
    const [workingHoursPerDay, setWorkingHoursPerDay] = useState<number>()
    const [hoursEstimate, setHoursEstimate] = useState<number>()
    const [projectValue, setProjectValue] = useState<number>(null)
    
    // verificar a quantidade de horas de trabalho por dia do perfil bate 
    // com a quantidade de horas dedicada ao job

    // function createNewJob(job: Job) {
    //     api.post(`/profiles/${profile.id}/jobs`, job)
    //         .then(response => {
    //             toast.success("Job adicionado");
    //             router.push('/')
    //         })
    //         .catch(error => {
    //             const { data } = error.response
    //             const problem = data

    //             toast.error(`Desculpe! ${problem.title}`)
    //         })
          
    // }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const newJob = {
            name,
            workingHoursPerDay: ((workingHoursPerDay * 60) * 60),
            hoursEstimate: ((hoursEstimate * 60) * 60),
            projectValue
        }

        api.post(`/profiles/${profile.id}`, newJob)
            .then(response => {
                toast.success("Job adicionado");
                router.push('/')
            })
            .catch(error => {
                const { data } = error.response
                const problem = data
            
                toast.error(`Desculpe! ${problem.title}`)
            })

        // saveNewJob(newJob, profile.id)
        //     .then(response => {
        //         toast.success("Job adicionado");
        //         router.push('/')
        //     })
        //     .catch(error => {
        //         const { data } = error.response
        //         const problem = data
            
        //         toast.error(`Desculpe! ${problem.title}`)
        //     })
    }

    useEffect(() => {
        if (hoursEstimate) {
            const valueHour = profile.valueHour
            const value = hoursEstimate * valueHour
            setProjectValue(value)
        } else {
            setProjectValue(null)
        }
        
    }, [hoursEstimate])

    return(
        <>
            <Head>
                <title>Adicionar novo job | JobsCalc</title>
            </Head>
            <Header title="Adicionar Novo Job" />
            <main className={commomStyles.wrapper}>
                <section className={commomStyles.container}>
                    <form 
                        className={styles.formContainer}
                        onSubmit={handleSubmit}
                    >
                        
                        <div className={styles.jobsData}>
                            <div className={styles.fieldGroup}>
                                <h3>Dados do Job</h3>
                                <div className={styles.row}>
                                    <Input 
                                        label='Nome do Job' 
                                        onChange={(event) => setName(event.currentTarget.value)}
                                    />
                                </div>
                                <div className={styles.grid2}>
                                    <Input 
                                        label='Quantas horas por dia vai dedicar ao Job?'
                                        onChange={(event) => setWorkingHoursPerDay(Number(event.target.value))}    
                                    />
                                    <Input 
                                        label='Estimativa de horas para esse job'
                                        onChange={(event) => setHoursEstimate(Number(event.target.value))}    
                                    />
                                </div>
                            </div>
                        </div>

                        {projectValue ? (
                            <CardProjectAmount largeFontSize>
                                <img src="/dolar2.svg" alt="dolar" />
                                <p>O valor do projeto ficou em <strong>{formatPrice(projectValue/100)} reais</strong></p>
                            </CardProjectAmount> 
                        ) : (
                            <CardProjectAmount>
                                <img src="/dolar.svg" alt="dolar" />
                                <p>Preencha os dados ao lado para ver o valor do projeto</p>
                            </CardProjectAmount> 
                        )}
                        
                    </form>
                </section>
            </main>
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
    
    const profileActive = session.activeProfile

    const profile = {
        id: profileActive.id,
        workingHoursPerDay: profileActive.workingHoursPerDay,
        valueHour: profileActive.valueHour
    }

    return {
        props: {
            profile
        }
    }
} 