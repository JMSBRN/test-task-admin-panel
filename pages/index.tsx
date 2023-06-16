import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const { push } = useRouter();

  useEffect(() => {
   push('/admin');
  }, [push]);
  
  return (
   <div className="">index</div>
  );
};

export default Index;
