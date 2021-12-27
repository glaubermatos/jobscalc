import { FiEdit3, FiTrash } from 'react-icons/fi'

import styles from './styles.module.scss'

interface Job {
  id: number;
  project: string;
  deadline: number;
  amount: number;
  status: string;
}

interface JobsTableProps {
  jobs: Job[]
}

export function JobsTable({jobs}: JobsTableProps) {
    return <div className={styles.jobsTable}>
       {jobs.map((job) => (
            <div key={job.id} className={styles.job}>
                <div className={styles.row}>
                    <span>{job.id}</span>
                    <strong>{job.project}</strong>
                </div>
                <div className={styles.column}>
                    <span>Prazo</span>
                    <strong>{job.deadline}</strong>
                </div>
                <div className={styles.column}>
                    <span>Valor</span>
                    <strong>{job.amount}</strong>
                </div>
                <div className={styles.status}>
                    {job.status}
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