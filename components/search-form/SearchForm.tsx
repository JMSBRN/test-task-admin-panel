import React, { useState } from 'react';
import { useGetList, useRefresh } from 'react-admin';
import { ContactForInpuSelect } from '../interfaces';
import Image from 'next/image';
import InputWithSelectField from '../input-with-select-field/InputWithSelectField';
import { SearchFormData } from './interfaces';
import industryIcon from '../../public/svgs/Icon_Industry.svg';
import jobTitleIcon from '../../public/svgs/Icon_JobTitle.svg';
import locationIcon from '../../public/svgs/Icon_Location.svg';
import searchIcon from '../../public/svgs/Icon_Search.svg';
import styles from './searchForm.module.scss';

const SearchForm = () => {
  const {
    searchForm,
    jobTitleStyle,
    lineFirst,
    lineSecond,
    titleIconStyle,
    searchIconStyle,
    inputPlaceHolder
  } = styles;
  const initFfomLocalFormData: SearchFormData =
   JSON.parse(window.localStorage.getItem('formData') || '{}');
  const [formData, setFormData] = useState<SearchFormData>(initFfomLocalFormData);
  const { data } = useGetList('contacts', { filter: formData });
  const refresh = useRefresh();
  const [inputValue, setInputValue] = useState<string>();

  const setFormDataToLocal = (formData: SearchFormData) => {
    // filter not working in api for country an industry ??
    window.localStorage.setItem('formData', JSON.stringify({
      job_title: formData.job_title,
      country: '',
      industry: ''
    }));
  };
  
   const handleChange = (e: React.ChangeEvent< HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const value = e.target.value;

        setFormData({ ...formData,
          [e.target.name]: value
        });
        setInputValue(value);
        setFormDataToLocal(formData);
        refresh();
      };
        
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setFormDataToLocal(formData);
          refresh();
      };
   
  return (  
    <form className={searchForm} onSubmit={handleSubmit} >
      <label className={jobTitleStyle}>
        <Image className={titleIconStyle} width={16} src={jobTitleIcon} alt="bag" />
        {
          !inputValue &&
          <><Image
            className={searchIconStyle}
            width={16}
            height={16}
            src={searchIcon}
            alt="search icon in input" />
            <span className={inputPlaceHolder}>
            Search by job title
              </span>
              </>
        }
        <span>job title</span>
        <input 
        name='job_title'
        value={inputValue}
        type="text"
        onChange={handleChange}
        />
      </label>
        <span className={lineFirst}></span>
      <InputWithSelectField
        data={data as ContactForInpuSelect[]}
        labelIcon={locationIcon}
        fieldName='country'
        labelText='Country'
        formData={formData}
        setFormData={setFormData}
      />
        <span className={lineSecond}></span>
      <InputWithSelectField
        data={data as ContactForInpuSelect[]}
        labelIcon={industryIcon}
        fieldName='industry'
        labelText='Industry'
        formData={formData}
        setFormData={setFormData}
      />
    </form>
  );
};

export default SearchForm;