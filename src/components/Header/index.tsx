import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

import commomStyles from '../../styles/commom.module.scss'
import styles from './styles.module.scss'

interface HeaderProps {
    title: string;
}

export function Header({title}: HeaderProps) {
    return <header className={styles.header}>
        <div className={commomStyles.container}>
            <Link href={'/'}>
                <a>
                    {/* <FiArrowLeft size={'1.5rem'}/> */}
                    <img src="/arrow-left.svg" alt="back" />
                </a>
            </Link>
            <strong>{title}</strong>
        </div>
    </header>
}