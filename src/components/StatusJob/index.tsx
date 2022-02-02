import { FormEvent, useState } from 'react';
import styles from './styles.module.scss'

interface Job {
    id: number;
    status: string;
}

interface StatusJobProps {
    job: Job
    onChangeStatus: (status: string) => void
}

export function StatusJob({job, onChangeStatus}: StatusJobProps) {

    const [status, setStatus] = useState(job.status)

    function handleChangeStatusJob(newStatus: string, event: FormEvent) {
        event.preventDefault()
        
        setStatus(newStatus)

        onChangeStatus(newStatus)
    }

    // const JOB_STATUSss: 'Não iniciado' | 'Em andamento' | 'Encerrado'
    let JOB_STATUS = new Map();
    JOB_STATUS['NOTSTARTED'] = 'Não iniciado'
    JOB_STATUS['INPROGRESS'] = 'Em endamento'
    JOB_STATUS['CLOSED'] = 'Encerrado'

    return (
        <div className={styles.statusJob}>
            <label>Status do Job</label>
            <div className={styles.container}>
                <button 
                    className={`${styles.notStarted} ${status === 'NOTSTARTED' ? styles.active : ''}`}
                    onClick={(e) => handleChangeStatusJob('NOTSTARTED', e)}
                >
                    {JOB_STATUS['NOTSTARTED']}
                </button>

                <button 
                    className={`${styles.inProgress} ${status === 'INPROGRESS' ? styles.active : ''}`}
                    onClick={(e) => handleChangeStatusJob('INPROGRESS', e)}
                >
                    {JOB_STATUS['INPROGRESS']}
                </button>

                <button 
                    className={`${styles.closed} ${status === 'CLOSED' ? styles.active : ''}`}
                    onClick={(e) => handleChangeStatusJob('CLOSED',e)}
                >
                    {JOB_STATUS['CLOSED']}
                </button>
            </div>
        </div>
    )
}