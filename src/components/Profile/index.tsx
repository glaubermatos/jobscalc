import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { FiLogOut } from 'react-icons/fi'

import styles from './styles.module.scss'

import { FormEvent } from 'react'

interface Profile {
    email: string,
    name: string,
    avatarUrl: string
}

interface ProfileProps {
    profile: Profile,
}

export function Profile({profile}: ProfileProps) {

    function handleSignOut(event: FormEvent) {
        event.preventDefault()
        signOut()
    }

    return (
        <nav className={styles.perfil}>
            <Link href={`/profile/${profile.email}`}>
              <a>
                <div>
                  <strong>{profile.name}</strong>
                  <span>Ver perfil</span>
                </div>
                <img src={profile.avatarUrl} alt={`Foto de perfil de ${profile.name}`} />
              </a>
            </Link>
            <button
                type="button"
                onClick={handleSignOut}    
            >
                <FiLogOut size={24} />
                Sair
            </button>
        </nav>
    )
}