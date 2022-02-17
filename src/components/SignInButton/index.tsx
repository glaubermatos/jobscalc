import { signIn } from "next-auth/react"

import { FaGithub } from 'react-icons/fa'

import styles from './styles.module.scss'

export function SignInButton() {
  return (
      <button 
        className={styles.signinButton}
        onClick={() => signIn()}
      >
        <FaGithub size={'1.5rem'} />
        Entrar com Github
      </button>
  )
}