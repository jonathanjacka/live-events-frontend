import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import formatDateForInput from '@/utils/formatDate';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import { Modal } from '@/components/Modal';
import { ImageUpload } from '@/components/ImageUpload';

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  //shows cookie has been set correctly - remove this
  console.log(req.headers.cookie);

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

  const [imagePreview, setImagePreview] = useState(
    evt.image && evt.image.formats.thumbnail.url
  );

  const [showModal, setShowModal] = useState(false);

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
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'PUT',
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

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    console.log('Data Image: ', data.image);
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
    toast.success('Image Upload Successful!');
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

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className='btn-secondary' onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}
