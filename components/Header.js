import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import { Search } from './Search';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
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
          {user ? (
            //if logged in
            <>
              <li>
                <Link href='/events/add'>
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className='btn-secondary btn-icon'
                >
                  <FaSignOutAlt />
                  Log out
                </button>
              </li>
            </>
          ) : (
            //else not logged in
            <>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt />
                    Log in
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
