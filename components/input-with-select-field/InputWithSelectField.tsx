import React, { useState } from 'react';
import { ContactForInpuSelect } from '../interfaces';
import Image from 'next/image';
import { SearchFormData } from '../search-form/interfaces';
import styles from './inputWithSelectField.module.scss';

interface InputWithSelectFieldProps {
    labelText: string;
    labelIcon: string;
    fieldName: string;
    data: ContactForInpuSelect[];
    formData: SearchFormData;
    setFormData: React.Dispatch<React.SetStateAction<SearchFormData>>;
}

const InputWithSelectField = ({ 
    labelText,
    labelIcon,
    fieldName,
    data,
    formData,
    setFormData
 }: InputWithSelectFieldProps) => {
 const { InputStyle } = styles;
 const [selectListRendered, setSelectListRendered] = useState<boolean>(false);
 const [inputValueForFilter, setInputValueForFilter] = useState<string>('');

 const setFormDataToLocal = (formData: SearchFormData) => {
    // filter not working in api for country an industry ??
    window.localStorage.setItem('formData', JSON.stringify({
      job_title: formData.job_title,
      country: '',
      industry: ''
    }));
  };

 const handleChangeSelectValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;

    if (value && value.match('^[a-zA-Z]+$')){
      setSelectListRendered(true);
    } else {
      setSelectListRendered(false);
    }    
    setInputValueForFilter(value.toLowerCase());
  };

  const handleGetFilteredValue = (e: React.MouseEvent<HTMLDivElement>, fieldName: string) => {
       setFormData({ ...formData,
        [fieldName]: e.currentTarget.id
      });
      setFormDataToLocal(formData);
      setSelectListRendered(false);    
  };

  return (
    <label className={InputStyle}>
    <Image width={16} src={labelIcon} alt="drop" />
      {labelText}
       <input name={fieldName} type="text" onChange={handleChangeSelectValue} />
       {
        selectListRendered && <div>
          { 
            data?.filter(item => {
              if(item[fieldName].toLowerCase().includes(inputValueForFilter)) {
                return item;             
              }
            }).map( el => (
              <div 
              key={el.id}
              id={el[fieldName]}
              onClick={(e) => handleGetFilteredValue(e, 'country')}>{el[fieldName]}</div>
            ))
          }
        </div>
       }
    
    </label>
  );
};

export default InputWithSelectField;