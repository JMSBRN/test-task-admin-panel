import React from 'react';
import SearchPage from '../../components/pages/search-page/SearchPage';
import WelcomePage from '../../components/pages/welcom-page/WelcomePage';
import styles from './layout.module.scss';
import { useGetList } from 'react-admin';

const Layout = () => {
  const { total } = useGetList('contacts');

  return (
    <div className={styles.layOutMainContainer}>
      <SearchPage total={total!} table={ <WelcomePage /> }/>
    </div>
  );
};

export default Layout;