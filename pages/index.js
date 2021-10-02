import { Layout } from '@/components/Layout';
import { API_URL } from '@/config/index';

//runs first visit only, validate will update only if change detected...
//Why not use getServerSideProps() instead?
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}

export default function HomePage({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  );
}
