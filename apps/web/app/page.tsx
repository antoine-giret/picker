import Link from 'next/link';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Accueil</h1>
        <Link href="/board-games">Jeux de société</Link>
      </main>
    </div>
  );
}
