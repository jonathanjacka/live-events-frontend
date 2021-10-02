import Link from 'next/link';
import styles from '../styles/Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Live Events</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href='/events'>Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
