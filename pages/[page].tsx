import Login from '../components/pages/login/Login';
import React from 'react';
import SearchPage from '../components/search-page/SearchPage';
import { useRouter } from 'next/router';

const Index = () => {
  const { query } = useRouter();

  switch (query.page) {
    case '1_1_Login':
      return <Login />;
    case '2_1_First_Enter':
      return <SearchPage />;
    case '3_1_Table':
      return <div>3_1_Table</div>;
    default:
      return <div>default</div>;
  }
};

export default Index;
