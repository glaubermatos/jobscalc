import Head from "next/head";
import { CardProjectAmount } from "../../components/CardProjectAmount";
import { Header } from "../../components/Header";
import { Button } from "../../shared/Button";
import { Input } from "../../shared/Input";

import commomStyles from '../../styles/commom.module.scss'
import styles from './styles.module.scss'

export default function NewJob() {
    return(
        <>
            <Head>
                <title>Adicionar novo job | JobsCalc</title>
            </Head>
            <Header title="Adicionar Novo Job" />
            <main className={commomStyles.wrapper}>
                <section className={commomStyles.container}>
                    <form action="#" className={styles.formContainer}>
                        
                        <div className={styles.jobsData}>
                            <div className={styles.fieldGroup}>
                                <h3>Dados do Job</h3>
                                <div className={styles.row}>
                                    <Input label='Nome do Job' />
                                </div>
                                <div className={styles.grid2}>
                                    <Input label='Quantas horas por dia vai dedicar ao Job?' />
                                    <Input label='Estimativa de horas para esse job' />
                                </div>
                            </div>
                        </div>

                        <CardProjectAmount>
                            <img src="/dolar.svg" alt="dolar" />
                            <p>Preencha os dados ao lado para ver o valor do projeto</p>
                        </CardProjectAmount> 
                        
                    </form>
                </section>
            </main>
        </>
    )
}