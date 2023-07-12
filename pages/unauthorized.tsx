import Link from 'next/link';
import React from 'react';
import styles from '../styles/unauthorized.module.scss';

const Unauthorized = () => {
  const { mainContainer } = styles;

  return (
    <div className={mainContainer}>
      <h2>Unauthorized</h2>
      <Link href={'/login'}>Go to login page</Link>
    </div>
  );
};

export default Unauthorized;