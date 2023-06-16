import AdminList from '../amin-list/AdminList';
import React from 'react';
import SearchPage from '../../components/search-page/SearchPage';
import { useGetList } from 'react-admin';

const Layout = () => {
  const { total } = useGetList('contacts');

  return (
    <>
      <SearchPage total={total!} table={ <AdminList /> }/>
    </>
  );
};

export default Layout;