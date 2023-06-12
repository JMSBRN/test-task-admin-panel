import Form from '../../form/Form';
import React from 'react';
import styles from './login.module.scss';

const Login = () => {
  const { 
    mainContainer,
    leftSide,
    formContainer,
    mainTitleContainer,
    rightSide
   } = styles;

  return (
    <div className={mainContainer}>
      <div className={rightSide}>
        <div className={mainTitleContainer}>
          <div>
           Login to lorem ipsum
          </div>
          <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </div>
        </div>
        <div className={formContainer}>
           <Form />
        </div>
      </div>
      <div className={leftSide}></div>
    </div>
  );
};

export default Login;