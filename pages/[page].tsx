
import Login from '../components/pages/login-page/Login';
import NotFound from '../components/pages/not-found/NotFound';
import React from 'react';
import UpgradePage from '../components/pages/profile-page/ProfilePage';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Index = () => {
  const { query } = useRouter();

  switch (query.page) {
    case 'login':
      return <Login />;
    case 'admin':
    const App = dynamic(() => import('../admin/Admin'), { ssr: false });

    return (
     <App />
    );
    case 'profile': 
    return <UpgradePage />;
    default:
      return <NotFound />;
  }
};

export default Index;
