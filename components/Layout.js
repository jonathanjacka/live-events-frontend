import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from '@/styles/Layout.module.css';
import { Showcase } from './Showcase';

export const Layout = ({ title, keywords, description, children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <Header />

      {router.pathname === '/' && <Showcase />}

      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'Live Events | Find the best live events',
  description: 'Find the latest live events',
  keywords: 'live, music, events, dj, rock, edm',
};
