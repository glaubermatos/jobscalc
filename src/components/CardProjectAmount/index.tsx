import { FormEvent, ReactNode } from 'react';
import { FiTrash } from 'react-icons/fi'

import { Button } from "../../shared/Button";

import styles from './styles.module.scss'

interface CardProjectAmountProps {
    largeFontSize?: boolean;
    children: ReactNode;
    onOpenModalDeleteJob?: () => void;
}

export function CardProjectAmount({children, largeFontSize = false, onOpenModalDeleteJob = null}: CardProjectAmountProps) {

    function handleOpenModalDeleteJob(event: FormEvent) {
        event.preventDefault()
        onOpenModalDeleteJob()
    }

    return(
        <aside className={`${styles.cardWrapper} ${largeFontSize ? styles.largeFontSize : null}`}>
            {children}
            
            <div className={styles.actions}>
                <Button type='submit' color="primary">
                    Salvar
                </Button>
                {onOpenModalDeleteJob !== null ? (
                    <Button onClick={handleOpenModalDeleteJob}>
                        <FiTrash size={'1.5rem'} />
                    </Button>
                ) : null}
            </div>
        </aside>
    )
}