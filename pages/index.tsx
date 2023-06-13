import React, { useEffect }  from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const { push } = useRouter();
  
  useEffect(() => {
   push('/2_1_First_Enter');
  }, [push]);
  
  return (
    <div>index</div>
  );
};

export default Index;
