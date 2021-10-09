import { Layout } from '@/components/Layout';
import { DashboardEvent } from '@/components/DashboardEvent';
import { API_URL } from '@/config/index';
import { parseCookies } from '@/utils/parseCookies';
import styles from '@/styles/Dashboard.module.css';
import { useState } from 'react';

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
      token,
    },
  };
}

export default function DashboardPage({ events, token }) {
  const [evts, setEvts] = useState(events);

  const deleteEvent = async (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(`Error: ${data.message}`);
      } else {
        const newEvts = evts.filter((evt) => evt.id !== id);
        setEvts(newEvts);
      }
    }
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {evts ? (
          evts.map((evt) => (
            <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
          ))
        ) : (
          <h3>You haven't added any events yet</h3>
        )}
      </div>
    </Layout>
  );
}
