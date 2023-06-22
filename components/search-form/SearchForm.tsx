import React, { useState } from 'react';
import { useGetList, useRefresh } from 'react-admin';
import Image from 'next/image';
import { SearchFormData } from './interfaces';
import industryIcon from '../../public/svgs/Icon_Industry.svg';
import jobTitleIcon from '../../public/svgs/Icon_JobTitle.svg';
import locationIcon from '../../public/svgs/Icon_Location.svg';
import styles from './searchForm.module.scss';

const SearchForm = () => {
  const {
    searchForm,
    jobTitleStyle,
    locationStyle,
    industryStyle
  } = styles;
  const initFfomLocalFormData: SearchFormData =
   JSON.parse(window.localStorage.getItem('formData') || '{}');
  const [formData, setFormData] = useState<SearchFormData>(initFfomLocalFormData);
  const { data } = useGetList('contacts', { filter: formData });
  const refresh = useRefresh();

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
        setFormData({ ...formData,
          [e.target.name]: e.target.value
        });
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
        <Image width={16} src={jobTitleIcon} alt="bag" />
        job title
        <input 
        name='job_title'
        type="text"
        onChange={handleChange}
        placeholder="Search by job title"
        />
      </label>
      <label className={locationStyle}>
      <Image width={16} src={locationIcon} alt="drop" />
        Location
        <select name="country" onChange={handleChange}>
          <option >{`${ formData.country || 'Choose Location'}`}</option>
          { data?.map(el => (
            <option key={el.id} value={el.country}>{el.country}</option>
          ))}
        </select>
      </label>
      <label className={industryStyle}>
      <Image width={16} src={industryIcon} alt="plant" />
        Industry
        <select name="industry" onChange={handleChange} >
        <option >{`${ formData.industry || 'Choose Location'}`}</option>
        { data?.map(el => (
            <option key={el.id} value={el.industry}>{el.industry}</option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default SearchForm;