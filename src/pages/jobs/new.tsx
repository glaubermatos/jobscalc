import { GetServerSideProps } from "next";
import { useRouter } from 'next/router'
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { CardProjectAmount } from "../../components/CardProjectAmount";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Button } from "../../shared/Button";
import { Input } from "../../shared/Input";

import commomStyles from '../../styles/commom.module.scss'
import styles from './styles.module.scss'

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

    async function createNewJob(job: Job) {
        try {
            await api.post(`/profiles/${profile.id}/jobs`, job)
            router.push('/')
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
            projectValue
        }

        createNewJob(newJob)
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
                                <p>O valor do projeto ficou em <strong>R$ {projectValue/100} reais</strong></p>
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

export const getServerSideProps: GetServerSideProps = async () => {
    
    const responseProfile = await api.get<Profile>(`/profiles/glaub.oliveira@hotmail.com`)
    
    const profileResponse = responseProfile.data

    const profile = {
        id: profileResponse.id,
        workingHoursPerDay: profileResponse.workingHoursPerDay,
        valueHour: profileResponse.valueHour
    }

    return {
        props: {
            profile
        }
    }
} 