import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface ButtonProps {
    children: ReactNode;
    color?: 'primary' | 'danger' | 'default'
}

export function Button({children, color = 'default'}: ButtonProps) {
    return(
        <button 
            className={`${styles.buttonWrapper} ${color !== 'default' ? (color === 'primary' ? styles.primary : styles.danger) : null}`}>
            {children}
        </button>
    )
}