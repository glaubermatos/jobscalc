import { HTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    color?: 'primary' | 'danger' | 'default'
}

export function Button({children, color = 'default', ...props}: ButtonProps) {
    return(
        <button 
            className={`${styles.buttonWrapper} ${color !== 'default' ? (color === 'primary' ? styles.primary : styles.danger) : null}`}
            {...props}
        >
            {children}
        </button>
    )
}