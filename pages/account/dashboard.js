import { Layout } from '@/components/Layout';
import { DashboardEvent } from '@/components/DashboardEvent';
import { API_URL } from '@/config/index';
import { parseCookies } from '@/utils/parseCookies';
import styles from '@/styles/Dashboard.module.css';

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}

export default function DashboardPage({ events }) {
  const deleteEvent = (id) => {
    console.log(`DELETE ME: ${id}`);
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events ? (
          events.map((evt) => (
            <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
          ))
        ) : (
          <h3>You haven't added any events yet</h3>
        )}
      </div>
    </Layout>
  );
}
