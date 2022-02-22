import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

import commomStyles from '../../styles/commom.module.scss'
import styles from './styles.module.scss'

interface HeaderProps {
    title: string;
}

export function Header({title}: HeaderProps) {
    const { data: session, status } = useSession()   

    return <header className={styles.header}>
        <div className={commomStyles.container}>
            {status === "authenticated" ? (
                <Link href={'/'}>
                    <a>
                        {/* <FiArrowLeft size={'1.5rem'}/> */}
                        <img src="/arrow-left.svg" alt="back" />
                    </a>
                </Link>
            ) : (
                <button 
                    onClick={() => signOut()}
                >
                    <img src="/arrow-left.svg" alt="back" />
                    Cancelar
                </button>
            )}
            <strong>{title}</strong>
        </div>
    </header>
}