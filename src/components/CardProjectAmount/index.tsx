import { FiTrash } from 'react-icons/fi'

import { Button } from "../../shared/Button";

import styles from './styles.module.scss'

export function CardProjectAmount() {
    return(
        <aside className={styles.cardWrapper}>
            <img src="/dolar.svg" alt="dolar" />
            <p>Preencha os dados ao lado para ver o valor do projeto</p>
            
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