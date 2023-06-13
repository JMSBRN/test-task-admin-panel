import React from 'react';
import styles from './form.module.scss';

const Form = () => {
    const {
        formStyle,
    } = styles;

  return (
    <form className={formStyle}>
      <label>
        Email
       <input id="email" type="text" placeholder='Enter your email' />
      </label>
      <label >
        Password
       <input  type="text" placeholder='Enter your password' />
      </label>
        <input id="submit" type="submit" value="Login" />
    </form>
  );
};

export default Form;