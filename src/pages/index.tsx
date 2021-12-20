import commomStyles from '../styles/commom.module.scss'
import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={commomStyles.container}>
          <div className={styles.menu}>
            <img src="/logo.svg" alt="logo" />
            <span>
              <img src="/alert-octagon.svg" alt="alert" />
              Você tem 2 horas livres no seu dia
            </span>
            <div className={styles.perfil}>
              <div>
                <strong>Jaqueline</strong>
                <span>Ver perfil</span>
              </div>
              <img src="/perfil.png" alt="perfil" />
            </div>
          </div>
          <div className={styles.summary}>
             
          </div>
        </div>
      </header>
    </>
  )
}
