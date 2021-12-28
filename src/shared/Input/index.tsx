import { InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({label, ...props}: InputProps) {
    return <div className={styles.inputWrapper}>
        {label ? (<label htmlFor="">{label}</label>) : null}
        <input type="text" {...props} />
    </div>
}