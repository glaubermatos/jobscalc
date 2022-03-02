import { useRouter } from 'next/router'
import { FiEdit3, FiTrash } from 'react-icons/fi'

import styles from './styles.module.scss'

interface Job {
  id: number;
  name: string;
  deadline: string;
  amount: string;
  status: string /* 'NOTSTARTED' | 'INPROGRESS' | 'CLOSED' */;
}

interface JobsTableProps {
    profileId: number;
    jobs: Job[];
    onOpenModalDeleteJob: (job: Job) => void;
}

export function JobsTable({profileId, jobs, onOpenModalDeleteJob}: JobsTableProps) {
    const router = useRouter()

    function navigateToEditJob(jobId: number) {
        router.push(`/jobs/${jobId}`)
    }

    return <div className={styles.jobsTable}>
       {jobs.map((job) => (
            <div key={job.id} className={styles.job}>
                <div className={`${styles.column} ${styles.id}`}>
                    <span>{job.id}</span>
                </div>
                <div className={`${styles.column} ${styles.name}`}>
                    <strong>{job.name}</strong>
                </div>
                <div className={`${styles.column} ${styles.deadline}`}>
                    <span>Prazo</span>
                    <strong>{job.deadline}</strong>
                </div>
                <div className={`${styles.column} ${styles.amount}`}>
                    <span>Valor</span>
                    <strong>{job.amount}</strong>
                </div>
                <div className={`${styles.column} ${styles.status}`} >
                    <label className={`${styles.badge} ${styles.status} ${job.status === 'INPROGRESS' ? (
                                styles.inProgress
                            ) : (job.status === 'CLOSED' ? (styles.closed) : (styles.notStarted))}`}
                >
                    {job.status === 'INPROGRESS' ? (
                        'Em andamento'
                    ) : (
                        job.status === 'CLOSED' ? 
                            ('Encerrado') : ('Não iniciado')
                    )} 
                    </label>
                    
                </div>
                <div className={`${styles.column} ${styles.actions}`}>
                    <button onClick={() => navigateToEditJob(job.id)}> 
                        <FiEdit3 size={24} />
                    </button>
                    <button onClick={() => onOpenModalDeleteJob(job)}>
                        <FiTrash size={24} />
                    </button>
                </div>
            </div>
        ))}     
    </div>
}