import { GetServerSideProps } from "next";
import Head from "next/head";

import { getSession } from "next-auth/react";

import { SignInButton } from "../../components/SignInButton";

import styles from './styles.module.scss'

export default function SignIn() {
    return (
        <>
            <Head>
                <title>Entrar com Github | JobsCalc</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.imagem}></div>
                <div className={styles.content}>
                    <div className={styles.signin}>
                        <img src="logo.svg" alt="" />
                        <p>Gerêncie seus jobs de forma simples e fácil</p>
                        <SignInButton />
                    </div>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req})

    if (session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}