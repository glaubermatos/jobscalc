import { GetServerSideProps } from "next"
import { getSession, useSession } from "next-auth/react"
import Head from "next/head"
import { useState } from "react"

import { Header } from "../../components/Header"
import { api } from "../../services/api"
import { Button } from "../../shared/Button"
import { Input } from "../../shared/Input"

import commomStyles from '../../styles/commom.module.scss'
import styles from './styles.module.scss'

interface NewProfile {
    email: string;
    name: string;
    avatarUrl: string;
}

export interface Profile {
    id?: number;
    email: string;
    name: string;
    avatarUrl: string;
    remuneration?: number;
    workingHoursPerDay?: number;
    workingDaysPerWeek?: number;
    vacationWeekPerYear?: number;
    valueHour?: number;
}

interface ProfileProps {
    profile: Profile;
}

export default function Profile2({ profile }: ProfileProps) {
    const session = useSession()

    let activeProfile: Profile

    if (session.data)
        activeProfile = session?.data.activeProfile

    const [remuneration, setRemuneration] = useState(profile.remuneration)
    const [workingHoursPerDay, setWorkingHoursPerDay] = useState(profile.workingHoursPerDay)
    const [workingDaysPerWeek, setWorkingDaysPerWeek] = useState(profile.workingDaysPerWeek)
    const [vacationWeekPerYear, setVacationWeekPerYear] = useState(profile.vacationWeekPerYear)
    const [valueHour, setValueHour] = useState(profile.valueHour | 0)

    return (
        <>
            <Head>
                <title>{activeProfile != null ? 'Profile | JobsCalc' : 'Create new profile | JobsCalc'}</title>
            </Head>
            <Header title={activeProfile != null ? 'Meu perfil' : 'Crie seu perfil'} />
            <main className={commomStyles.wrapper}>
                <section className={commomStyles.container}>
                    <form action="#" className={styles.formContainer}>
                        <aside className={styles.hourValueCard}>
                            <img src={profile.avatarUrl} alt="perfil" />
                            <h2>{profile.name}</h2>
                            <p>O valor da sua hora é <strong>R$ {valueHour} reais</strong>
                            </p>
                            
                            <Button color='primary'>
                                Salvar dados
                            </Button>
                        </aside>
                        <div className={styles.profileData}>
                            <div className={styles.fieldGroup}>
                                <h3>Dados do perfil</h3>
                                <div className={styles.row}>
                                    <Input readOnly disabled placeholder='Nome' defaultValue={profile.name} />
                                    <Input readOnly disabled placeholder='Link da foto' defaultValue={profile.avatarUrl} />
                                </div>
                            </div>
                            <div className={styles.fieldGroup}> 
                                <h3>Planejamento</h3>
                                <div className={styles.row}>
                                    <Input label='Quanto eu quero ganhar por mês?' placeholder='R$' defaultValue={remuneration} />
                                    <Input label='Quantas horas quero trabalhar por dia?' defaultValue={workingHoursPerDay} />
                                    <Input label='Quantos dias quero trabalhar por semana?' defaultValue={workingDaysPerWeek} />
                                    <Input label='Quantas semanas por ano você quer tirar férias?' defaultValue={vacationWeekPerYear} />
                                </div>
                            </div>
                        </div>
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

    if (session.activeProfile) {
        const profile = session.activeProfile
    
        const profileFormated = {
            ...profile,
            remuneration: profile.remuneration/100,
            workingHoursPerDay: ((profile.workingHoursPerDay / 60) / 60),
            valueHour: profile.valueHour/100
    
        }
    
        return {
            props: {
                profile: profileFormated
            }
        }
    }

    return {
        props: {
            profile: {
                ...session.user,
                avatarUrl: session.user.image
            }
        }
    }
}