import Head from 'next/head'

import { Header } from '../../components/Header'
import { Button } from '../../shared/Button'
import { Input } from '../../shared/Input'

import commomStyles from '../../styles/commom.module.scss'
import styles from './styles.module.scss'

export default function Profile() {
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
                            <img src="/perfil2x.png" alt="perfil" />
                            <h2>Jaqueline</h2>
                            <p>O valor da sua hora é <strong>R$ 75,00 reais</strong>
                            </p>
                            
                            <Button color='primary'>
                                Salvar dados
                            </Button>
                        </aside>
                        <div className={styles.profileData}>
                            <div className={styles.fieldGroup}>
                                <h3>Dados do perfil</h3>
                                <div className={styles.row}>
                                    <Input placeholder='Nome' />
                                    <Input placeholder='Link da foto' />
                                </div>
                            </div>
                            <div className={styles.fieldGroup}> 
                                <h3>Planejamento</h3>
                                <div className={styles.row}>
                                    <Input label='Quanto eu quero ganhar por mês?' placeholder='R$' />
                                    <Input label='Quantas horas quero trabalhar por dia?' />
                                    <Input label='Quantos dias quero trabalhar por semana?' />
                                    <Input label='Quantas semanas por ano você quer tirar férias?' />
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}