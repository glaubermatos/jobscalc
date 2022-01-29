import Modal from 'react-modal'
import { FiTrash } from 'react-icons/fi'

import styles from './styles.module.scss'
import { Button } from '../../shared/Button'

interface Job {
    id: number;
    name: string;
}

interface ModalDeleteJobProps {
    isOpen: boolean;
    onRequestClose: () => void;
    jobForDeletion: Job;
    onDeleteJob: (job: Job) => void;
}

export function ModalDeleteJob({isOpen, onRequestClose, onDeleteJob, jobForDeletion}: ModalDeleteJobProps) {
    
    function handleDeleteJob(job: Job) {
        onDeleteJob(job)
        onRequestClose()
    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName={styles.reactModalOverlay}
            className={styles.reactModalContent}
        >
            <div className={styles.modalBody}>
                <FiTrash size={'3rem'} />
                <strong>Excluir Job</strong>
                <p>Quer mesmo excluir esse job? Ele será excluído pra sempre.</p>
                <div className={styles.modalActions}>
                    <Button onClick={onRequestClose}>Cancelar</Button>
                    <Button 
                        color='danger'
                        onClick={() => handleDeleteJob(jobForDeletion)}
                    >
                        Excluir job</Button>
                </div>
            </div>
        </Modal>
    )
}