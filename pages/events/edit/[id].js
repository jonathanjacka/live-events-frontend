import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import formatDateForInput from '@/utils/formatDate';

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: {
      evt,
    },
  };
}

export default function EditEventPage({ evt }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: formatDateForInput(evt.date),
    time: evt.time,
    description: evt.description,
  });

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    //validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields!');
    } else {
      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        toast.error('Something went wrong...');
      } else {
        const evt = await res.json();
        router.push(`/events/${evt.slug}`);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title='Edit Event'>
      <Link href='/events'>{'< Go Back'}</Link>
      <h1>Edit Event</h1>
      <ToastContainer />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          {/*Inputs here */}
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/*Inputs grid ends here */}

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            className={styles.text_description}
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Update Event' className='btn' />
      </form>
    </Layout>
  );
}
