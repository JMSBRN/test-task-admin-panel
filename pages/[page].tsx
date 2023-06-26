
import Login from '../components/pages/login-page/Login';
import React from 'react';
import UpgradePage from '../components/pages/profile-page/ProfilePage';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Index = () => {
  const { query } = useRouter();

  switch (query.page) {
    case '1_1_Login':
      return <Login />;
    case '2_1_First_Enter':
    const App = dynamic(() => import('../admin/Admin'), { ssr: false });

    return (
     <App />
    );
    case 'profile': 
    return <UpgradePage />;
    default:
      return <div>default</div>;
  }
};

export default Index;
