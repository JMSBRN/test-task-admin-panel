import React from 'react';
import dynamic from 'next/dynamic';

const admin = () => {
    const App = dynamic(() => import('../admin/Admin'), { ssr: false });
    
  return (
   <App />
  );
};

export default admin;