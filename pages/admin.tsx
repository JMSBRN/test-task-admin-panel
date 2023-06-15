import { Admin, ListGuesser, Resource } from 'react-admin';
import React from 'react';
import customDataProvider  from '../dataProvider';

const admin = () => {
    
  return (
    <Admin dataProvider={customDataProvider} >

        <Resource name='contacts' list={ ListGuesser } />
    </Admin>
  );
};

export default admin;