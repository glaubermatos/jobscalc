import styles from './styles.module.scss'

export function ButtonNewJob() {
    return <button className={styles.buttonNewJob}>
        <img src="/plus.svg" alt="plus" />
        Adicionar novo job
    </button>
}