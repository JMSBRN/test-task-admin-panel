import React from 'react';
import dynamic from 'next/dynamic';

const Index = () => {
  // const { push } = useRouter();
  //  C
  // useEffect(() => {
  //  push('/2_1_First_Enter');
  // }, [push]);

  const App = dynamic(() => import('../pages/admin'), { ssr: false });
  
  return (
    <App />
  );
};

export default Index;
