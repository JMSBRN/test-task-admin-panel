import AdminList from '../amin-list/AdminList';
import NoResultsPage from '../../components/no-results-page/NoResultsPage';
import React from 'react';
import SearchPage from '../../components/search-page/SearchPage';
import { useGetList } from 'react-admin';

const Layout = () => {
  const { data, total } = useGetList('contacts');

  return (
    <>
      <SearchPage total={total!} table={ data?.length! > 0 ? <AdminList /> : <NoResultsPage /> }/>
    </>
  );
};

export default Layout;