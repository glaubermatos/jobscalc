import { useRouter } from 'next/router'

import styles from './styles.module.scss'

export function ButtonNewJob() {

    const routes = useRouter()

    function navigateToNewJobPage() {
        routes.push('/jobs/create')
    }

    return <button onClick={navigateToNewJobPage}
        className={styles.buttonNewJob}>
        <img src="/plus.svg" alt="plus" />
        Adicionar novo job
    </button>
}