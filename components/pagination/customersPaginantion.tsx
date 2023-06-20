import { Pagination } from 'react-admin';
import React from 'react';

const CustomersPagination = () => {
  return (
    <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
  );
};

export default CustomersPagination;