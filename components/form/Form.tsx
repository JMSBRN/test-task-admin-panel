import React from 'react';
import styles from './form.module.scss';

const Form = () => {
    const {
        formStyle,
    } = styles;

  return (
    <form className={formStyle}>Form</form>
  );
};

export default Form;