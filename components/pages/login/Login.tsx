import Form from '../../form/Form';
import { LoginReg_Back } from '../../LoginReg_Back/LoginReg_Back';
import React from 'react';
import styles from './login.module.scss';

const Login = () => {
  const {
    mainContainer,
    leftSide,
    formContainer,
    mainTitleContainer,
    rightSide,
    mainTitle,
    secondTitle,
    leftSideLogoBlock,
    logo,
    secondTitleLeftSide,
    secondTitleLeftSideLast
  } = styles;

  return (
    <div className={mainContainer}>
      <div className={rightSide}>
        <div className={mainTitleContainer}>
          <div className={mainTitle}>Login to lorem ipsum</div>
          <div className={secondTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </div>
        </div>
        <div className={formContainer}>
          <Form />
        </div>
      </div>
      <div className={leftSide}>
       <LoginReg_Back />
        <div className={leftSideLogoBlock}>
          <div className={logo}>Logo</div>
          <div className={secondTitleLeftSide}>
           Lorem ipsum dolor sit amet,
          </div>
          <div className={secondTitleLeftSideLast}>
           consectetur adipiscing elit
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
