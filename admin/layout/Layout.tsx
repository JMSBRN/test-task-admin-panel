import AdminList from '../amin-list/AdminList';
import NoResultsPage from '../../components/pages/no-results-page/NoResultsPage';
import React from 'react';
import SearchPage from '../../components/pages/search-page/SearchPage';
import styles from './layout.module.scss';
import { useGetList } from 'react-admin';

const Layout = () => {
  const { data, total } = useGetList('contacts');

  return (
    <div className={styles.layOutMainContainer}>
      <SearchPage total={total!} table={ data?.length! > 0 ? <AdminList /> : <NoResultsPage /> }/>
    </div>
  );
};

export default Layout;