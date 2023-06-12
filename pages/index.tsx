import React, { useEffect }  from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const { push } = useRouter();
  
  useEffect(() => {
   push('/1_1_Login');
  }, [push]);
  
  return (
    <div>index</div>
  );
};

export default Index;
