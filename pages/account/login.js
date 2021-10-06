import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '@/components/Layout';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import styles from '@/styles/AuthForm.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //TODO: COMPLETE HANDLESUBMIT FUNCTION
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { email, password });
  };

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log in
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <input type='submit' value='Log in' className='btn' />
        </form>
        <p>
          No Account? <Link href='/account/register'>Register here</Link>
        </p>
      </div>
    </Layout>
  );
}
