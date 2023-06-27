import React, { useState } from 'react';
import Form from '../../login-form/LoginForm';
import { LoginReg_Back } from '../../LoginReg_Back/LoginReg_Back';
import { User } from '../../interfaces';
import styles from './login.module.scss';
import { useRouter } from 'next/router';

const Login = () => {
  const {
    layout,
    mainContainer,
    leftSide,
    formContainer,
    mainTitleContainer,
    rightSide,
    mainTitle,
    secondTitle,
    rightSideLogoBlock,
    logo,
    secondTitleRightSide,
    secondTitleRightSideLast
  } = styles;

  const [formData, setFormData] = useState({} as User);
  const router = useRouter();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const res = await fetch('/api/login/', {
   method: 'POST',
   headers: { 
     'Content-Type': 'application/json',
     'Authorization':'123'
  },
   body: JSON.stringify({ formData })
  });
  const result: { message: string } = await res.json();

   if(result) {
     if (result.message === 'created') {
       router.push('/admin');
       setFormData({ email: '', password: '' });        
     };
   }

 };

  return (
    <div className={layout}>
      <div className={mainContainer}>
        <div className={leftSide}>
          <div className={mainTitleContainer}>
            <div className={mainTitle}>Login to lorem ipsum</div>
            <div className={secondTitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </div>
          </div>
          <div className={formContainer}>
            <Form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
          </div>
        </div>
        <div className={rightSide}>
         <LoginReg_Back />
          <div className={rightSideLogoBlock}>
            <div className={logo}>Logo</div>
            <div className={secondTitleRightSide}>
             Lorem ipsum dolor sit amet,
            </div>
            <div className={secondTitleRightSideLast}>
             consectetur adipiscing elit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
