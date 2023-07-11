import React, { useState } from 'react';
import { LoginUser } from '../interfaces';
import { VectorIcon } from './VectorIcon';
import styles from './LoginForm.module.scss';

interface FormProps {
  formData: LoginUser;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  emailWithError: boolean;
  passwordWithError: boolean;
}
const LoginForm = ({ 
  formData,
  handleSubmit,
  handleChange,
  emailWithError,
  passwordWithError,
 }: FormProps) => {
  const { 
    formStyle,
    vectorIcon,
    hidePswBtn,
    vectorIconTwo,
    openEyeImagesStyle,
    openEyeImagesStyleHidden,
    eyeRadiusLine,
    inputStyle,
    inputStyleWithError,
    hidden
   } = styles;
  const [passwordRendered, setPasswordRendered] = useState<boolean>(false);

  const handleSetRenderedPsw = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPasswordRendered(!passwordRendered);
  };

  return (
    <><form className={formStyle} onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          className={emailWithError ? inputStyleWithError : inputStyle}
          name="email"
          value={formData.email || ''}
          type="text"
          placeholder={`${!formData.email && 'Enter your email'}`}
          onChange={handleChange} />
        <span className={emailWithError ? '' : hidden}>must be email format</span>
      </div>
      <div>
        <label>Password</label>
          {passwordRendered ? (
            <input
              className={passwordWithError ? inputStyleWithError : inputStyle}
              name="password"
              value={formData.password || ''}
              type="text"
              placeholder={`${!formData.password && 'Enter your password'}`}
              onChange={handleChange} />
          ) : (
            <input
              className={passwordWithError ? inputStyleWithError : inputStyle}
              name="password"
              value={formData.password || ''}
              type="password"
              placeholder={`${!formData.password && 'Enter your password'}`}
              onChange={handleChange} />
          )}
        <span className={passwordWithError ? '' : hidden}>min 8 digits, requred one leter</span>
      </div>
      <input type="submit" value="Login" />
    </form>
    <button className={hidePswBtn} onClick={handleSetRenderedPsw}>
        <VectorIcon className={vectorIcon} />
        <div className={passwordRendered ? openEyeImagesStyle : openEyeImagesStyleHidden}>
          <VectorIcon className={vectorIconTwo} />
          <div></div>
          <div className={eyeRadiusLine}></div>
        </div>
     </button>
    </>
  );
};

export default LoginForm;
