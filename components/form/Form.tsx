import React from 'react';
import { User } from '../interfaces';
import { VectorIcon } from './VectorIcon';
import styles from './form.module.scss';

interface FormProps {
  formData: User;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Form = ({ formData, handleSubmit, handleChange }: FormProps) => {
  const { formStyle, vectorIcon, hidePswBtn } = styles;

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
      <label>
        Password
        <>
          <input
            name="password"
            value={formData.password || ''}
            type="text"
            placeholder={`${!formData.password && 'Enter your password'}`}
            onChange={handleChange}
          />
          <button className={hidePswBtn}>
            <VectorIcon className={vectorIcon} />
          </button>
        </>
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Form;
