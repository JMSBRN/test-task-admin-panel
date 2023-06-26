import React, { useState } from 'react';
import { User } from '../interfaces';
import { VectorIcon } from './VectorIcon';
import styles from './form.module.scss';

interface FormProps {
  formData: User;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Form = ({ formData, handleSubmit, handleChange }: FormProps) => {
  const { 
    formStyle,
    vectorIcon,
    hidePswBtn,
    vectorIconTwo,
    openEyeImagesStyle,
    openEyeImagesStyleHidden,
    eyeRadiusLine,
    labelPsw
   } = styles;
  const [passwordRendered, setPasswordRendered] = useState<boolean>(false);

  const setStyleForShowPswButton = () => {
    if (passwordRendered) {
      return openEyeImagesStyle;
    } else {
       return openEyeImagesStyleHidden;
    }
  
  };

const handleSetRenderedPsw = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  setPasswordRendered(!passwordRendered);
};

  return (
    <form className={formStyle} onSubmit={handleSubmit}>
      <label>
        Email
        <input
          name="email"
          value={formData.email || ''}
          type="text"
          placeholder={`${!formData.email && 'Enter your email'}`}
          onChange={handleChange}
        />
      </label>
      <label className={labelPsw}>
        Password
        <>
        { passwordRendered ? (
          <input
            name="password"
            value={formData.password || ''}
            type="text"
            placeholder={`${!formData.password && 'Enter your password'}`}
            onChange={handleChange}
          />
        ) : (
          <input
            name="password"
            value={formData.password || ''}
            type="password"
            placeholder={`${!formData.password && 'Enter your password'}`}
            onChange={handleChange}
          />
        )
        }
          <button className={hidePswBtn} onClick={handleSetRenderedPsw}>
            <VectorIcon className={vectorIcon} />
            <div className={setStyleForShowPswButton()}>
            <VectorIcon className={vectorIconTwo} />
             <div></div>
             <div className={eyeRadiusLine}></div>
            </div>
          </button>
        </>
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Form;
