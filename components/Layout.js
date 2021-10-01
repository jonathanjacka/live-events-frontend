import Head from 'next/head';
import styles from '../styles/Layout.module.css';

export const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <div className={styles.container}>{children}</div>
    </div>
  );
};

Layout.defaultProps = {
  title: 'Live Events | Find the best live events',
  description: 'Find the latest live events',
  keywords: 'live, music, events, dj, rock, edm',
};
