import { ButtonNewJob } from '../components/ButtonNewJob'
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
            <a href="#" className={styles.perfil}>
              <div>
                <strong>Jaqueline</strong>
                <span>Ver perfil</span>
              </div>
              <img src="/perfil.png" alt="perfil" />
            </a>
          </div>
          <div className={styles.summary}>
             <div className={styles.amounts}>
                <div>
                  <strong>12</strong>
                  <span>Projetos ao total</span>
                </div>
                <div>
                  <strong>7</strong>
                  <span>Em andamento</span>
                </div>
                <div>
                  <strong>4</strong>
                  <span>Encerrados</span>
                </div>
             </div>
             <ButtonNewJob />
          </div>
        </div>
      </header>
    </>
  )
}
