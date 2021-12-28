import { useRouter } from 'next/router'
import { FiEdit3, FiTrash } from 'react-icons/fi'

import styles from './styles.module.scss'

interface Job {
  id: number;
  project: string;
  deadline: string;
  amount: string;
  status: string;
}

interface JobsTableProps {
  jobs: Job[];
  onOpenModalDeleteJob: () => void;
}

export function JobsTable({jobs, onOpenModalDeleteJob}: JobsTableProps) {
    const router = useRouter()

    function navigateToEditJob(jobId: number) {
        router.push(`/jobs/${jobId}`)
    }

    return <div className={styles.jobsTable}>
       {jobs.map((job) => (
            <div key={job.id} className={styles.job}>
                <div className={styles.row}>
                    <span>{job.id}</span>
                    <strong>{job.project}</strong>
                </div>
                <div className={styles.content}>
                    <div className={styles.column}>
                        <span>Prazo</span>
                        <strong>{job.deadline}</strong>
                    </div>
                    <div className={styles.column}>
                        <span>Valor</span>
                        <strong>{job.amount}</strong>
                    </div>
                    <div className={`${styles.status} ${job.status === 'Em andamento' ? (styles.inProgress) : (styles.closed)}`}>
                        {job.status}
                    </div>
                </div>
                <div className={styles.actions}>
                    <button onClick={() => navigateToEditJob(job.id)}> 
                        <FiEdit3 size={24} />
                    </button>
                    <button onClick={onOpenModalDeleteJob}>
                        <FiTrash size={24} />
                    </button>
                </div>
            </div>
        ))}     
    </div>
}