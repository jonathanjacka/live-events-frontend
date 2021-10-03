import styles from '@/styles/Search.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const Search = () => {
  const [term, setTerm] = useState('');

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder='Search...'
        />
      </form>
    </div>
  );
};
