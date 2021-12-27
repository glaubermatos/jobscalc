import Head from 'next/head'

import { Header } from '../../components/Header'

export default function Profile() {
    return(
        <>
            <Head>
                <title>Profile | JobsCalc</title>
            </Head>
            <Header title='Meu perfil' />
        </>
    )
}