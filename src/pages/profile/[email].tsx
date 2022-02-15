import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { Header } from '../../components/Header'
import { api } from '../../services/api'
import { Button } from '../../shared/Button'
import { Input } from '../../shared/Input'

import commomStyles from '../../styles/commom.module.scss'
import styles from './styles.module.scss'

interface Profile {
    id: number;
    email: string;
    name: string;
    avatarUrl: string;
    remuneration: number;
    workingHoursPerDay: number;
    workingDaysPerWeek: number;
    vacationWeekPerYear: number;
    valueHour: number;
}

interface ProfileProps {
    profile: Profile;
}

export default function Profile({profile}: ProfileProps) {
    return(
        <>
            <Head>
                <title>Profile | JobsCalc</title>
            </Head>
            <Header title='Meu perfil' />
            <main className={commomStyles.wrapper}>
                <section className={commomStyles.container}>
                    <form action="#" className={styles.formContainer}>
                        <aside className={styles.hourValueCard}>
                            <img src={profile.avatarUrl} alt="perfil" />
                            <h2>{profile.name}</h2>
                            <p>O valor da sua hora é <strong>R$ {profile.valueHour} reais</strong>
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
                                    <Input label='Quanto eu quero ganhar por mês?' placeholder='R$' defaultValue={profile.remuneration} />
                                    <Input label='Quantas horas quero trabalhar por dia?' defaultValue={profile.workingHoursPerDay} />
                                    <Input label='Quantos dias quero trabalhar por semana?' defaultValue={profile.workingDaysPerWeek} />
                                    <Input label='Quantas semanas por ano você quer tirar férias?' defaultValue={profile.vacationWeekPerYear} />
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {

    const emailProfile = params.email

    const response = await api.get(`/profiles/${emailProfile}`)

    const profile = await response.data

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