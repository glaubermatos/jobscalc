import { FiEdit3, FiTrash } from 'react-icons/fi'

import styles from './styles.module.scss'

export function JobsTable() {
    const jobs = ['Pizzaria Guloso', 'Prust Modas', 'Onetwo Project', 'Los Hermanos', 'Onetwo Project']

    return <div className={styles.jobsTable}>
       {jobs.map((job, index) => (
            <div className={styles.job}>
                <div className={styles.row}>
                    <span>{index + 1}</span>
                    <strong>{job}</strong>
                </div>
                <div className={styles.column}>
                    <span>Prazo</span>
                    <strong>3 dias para entrega</strong>
                </div>
                <div className={styles.column}>
                    <span>Valor</span>
                    <strong>R$ 4.500,00</strong>
                </div>
                <div className={styles.status}>
                    Em andamento
                </div>
                <div className={styles.actions}>
                    <button>
                        <FiEdit3 size={24} />
                    </button>
                    <button>
                        <FiTrash size={24} />
                    </button>
                </div>
            </div>
        ))}     
    </div>
}