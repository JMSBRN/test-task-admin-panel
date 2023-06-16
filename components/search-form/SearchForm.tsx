import React, { useState } from 'react';
import Image from 'next/image';
import { SearchFormData } from './interfaces';
import industryIcon from '../../public/svgs/Icon_Industry.svg';
import jobTitleIcon from '../../public/svgs/Icon_JobTitle.svg';
import locationIcon from '../../public/svgs/Icon_Location.svg';
import styles from './searchForm.module.scss';

const SearchForm = () => {
  const {
    searchForm,
    jobTitle,
    location,
    industry
  } = styles;
  const [formData, setFormData] = useState({} as SearchFormData);
  
   const handleChange = (e: React.ChangeEvent< HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        setFormData({ ...formData,
          [e.target.name]: e.target.value
        });
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(formData);
   };
   
  return (  
    <form className={searchForm} onSubmit={handleSubmit} >
      <label className={jobTitle}>
        <Image width={16} src={jobTitleIcon} alt="bag" />
        job-title
        <input 
        name='job-title'
        type="text"
        onChange={handleChange}
        placeholder="Search by job title"
        />
      </label>
      <label className={location}>
      <Image width={16} src={locationIcon} alt="drop" />
        Location
        <select name="location" onChange={handleChange}>
          <option value="">Choose Location</option>
          <option value="1">1</option>
        </select>
      </label>
      <label className={industry}>
      <Image width={16} src={industryIcon} alt="plant" />
        Industry
        <select name="industry" onChange={handleChange}>
        <option value="">Choose Industry</option>
          <option value="1">1</option>
        </select>
      </label>
    </form>
  );
};

export default SearchForm;