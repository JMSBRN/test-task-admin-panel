import React from 'react';
import { VectorIcon } from './VectorIcon';
import styles from './form.module.scss';

const Form = () => {
    const {
        formStyle,
        vectorIcon,
        hidePswBtn
    } = styles;

  return (
    <form className={formStyle}>
      <label>
        Email
       <input id="email" type="text" placeholder='Enter your email' />
      </label>
      <label >
        Password
        <>
          <input  type="text" placeholder='Enter your password' />
          <button className={hidePswBtn}>
            <VectorIcon className={vectorIcon} />
          </button>
        </>
      </label>
        <input id="submit" type="submit" value="Login" />
    </form>
  );
};

export default Form;