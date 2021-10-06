import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import { Search } from './Search';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Live Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>Events</Link>
          </li>
          <li>
            <Link href='/events/add'>
              <a>Add Event</a>
            </Link>
          </li>
          <li>
            <Link href='/account/login'>
              <a className='btn-secondary btn-icon'>
                <FaSignInAlt />
                Log in
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
