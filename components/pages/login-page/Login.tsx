import { LoginUser, SearchFormData } from '../../interfaces';
import React, { useState } from 'react';
import Form from '../../login-form/LoginForm';
import { LoginReg_Back } from '../../LoginReg_Back/LoginReg_Back';
import setFormDataToLocal from '../../../utils/localUtils';
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
    secondTitleRightSideLast,
    loadingStyle,
    apiErrorStyle,
  } = styles;

  const [formData, setFormData] = useState<LoginUser>({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>('');
  const { push } = useRouter();
  const clearedFilters = {
    job_title: '',
    country: { id: '', name: '' },
    industry: { id: '', name: '' },
  } as SearchFormData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setApiError('');
    const value = e.target.value;

    if (e.target.name === 'email') {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      setEmailError(!regexEmail.test(value));
    } else if (e.target.name === 'password') {
      const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      setPasswordError(!regexPassword.test(value));
    }
    if (!value) {
      setEmailError(false);
      setPasswordError(false);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmitInLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setApiError('');
    e.preventDefault();
    if (!emailError && formData.email && !passwordError && formData.password) {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '123',
        },
        body: JSON.stringify({ formData }),
      });
      const result: { message: string } = await res.json();

      if (result) {
        setLoading(false);
        if (result.message === 'created') {
          push('/admin');
          setFormData({ email: '', password: '' });
          setFormDataToLocal(clearedFilters);
        } else {
          setApiError(result.message);
        }
      }
    } else {
      setLoading(false);
      setApiError('all fields are required *');
      setTimeout(() => {
        setApiError('');
      }, 5000);
    }
  };

  return (
      <div className={mainContainer}>
        {loading && <div className={loadingStyle}>Loading...</div>}
        <div className={apiErrorStyle}>{apiError}</div>
        <div className={leftSide}>
          <div className={mainTitleContainer}>
            <div className={mainTitle}>Login to lorem ipsum</div>
            <div className={secondTitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </div>
          </div>
          <div className={formContainer}>
            <Form
              emailWithError={emailError}
              passwordWithError={passwordError}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmitInLogin}
            />
          </div>
        </div>
        <div className={rightSide}>
        <div className={layout}>
          <LoginReg_Back />
          <div className={rightSideLogoBlock}>
            <div className={logo}>Logo</div>
            <div className={secondTitleRightSide}>
              Lorem ipsum dolor sit amet
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
