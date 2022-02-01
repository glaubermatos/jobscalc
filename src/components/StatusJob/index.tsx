import styles from './styles.module.scss'

export function StatusJob() {

    return (
        <div className={styles.statusJob}>
            <label>Status do Job</label>
            <div className={styles.container}>
                <button className={`${styles.notStarted}`}>Nao iniciado</button>
                <button className={`${styles.inProgress} ${styles.active}`}>Em andamento</button>
                <button className={`${styles.closed}`}>Encerrado</button>
            </div>
        </div>
    )
}