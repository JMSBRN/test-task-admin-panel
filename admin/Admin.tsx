import { Admin, Resource } from 'react-admin';
import AdminList from './amin-list/AdminList';
import Layout from './layout/Layout';
import React from 'react';
import customDataProvider  from '../dataProvider';

const AdminApp = () => {
    
  return (
    <Admin layout={Layout} dataProvider={customDataProvider} >
        <Resource name='contacts' list={ AdminList } />
    </Admin>
  );
};

export default AdminApp;