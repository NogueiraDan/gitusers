import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1>Encontre um Dev no Github</h1>
        <Link href={"/search"} className={styles.link}><h3>Clique aqui</h3></Link>
      </div>
    </main>
  )
}
