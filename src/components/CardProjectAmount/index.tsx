import { ReactNode } from 'react';
import { FiTrash } from 'react-icons/fi'

import { Button } from "../../shared/Button";

import styles from './styles.module.scss'

interface CardProjectAmountProps {
    largeFontSize?: boolean;
    children: ReactNode;
}

export function CardProjectAmount({children, largeFontSize = false}: CardProjectAmountProps) {
    return(
        <aside className={`${styles.cardWrapper} ${largeFontSize ? styles.largeFontSize : null}`}>
            {children}
            
            <div className={styles.actions}>
                <Button color="primary">
                    Salvar
                </Button>
                <Button>
                    <FiTrash size={'1.5rem'} />
                </Button>
            </div>
        </aside>
    )
}